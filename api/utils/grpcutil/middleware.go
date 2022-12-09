package grpcutil

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/interviews/utils/errorutil"
	"github.com/interviews/utils/logger"
	"time"

	"github.com/google/uuid"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

const CorrelationIDCtxKey = "correlation-id"

type Middleware struct{}

func (m *Middleware) ServerErrorInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler,
) (interface{}, error) {
	resp, err := handler(ctx, req)
	if err != nil {
		clog := logger.GetLoggerFromContext(ctx)

		var apierr *logger.APIError

		ok := errors.As(err, &apierr)
		if !ok {
			apierr = errorutil.ErrInternal(err)
		}

		apierr.Method = info.FullMethod
		apierr.AddCtx("req", req)
		apierr.AddCtx("res", resp)
		clog.Error(apierr)

		// TODO: return error ID to client
		return resp, status.Error(codes.Code(apierr.Status), apierr.Message)
	}

	return resp, err
}

func (m *Middleware) ServerLogInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler,
) (interface{}, error) {
	t := time.Now()

	corrID := getCorrelationIDFromIncomingContext(ctx)

	ctxVals := map[string]interface{}{
		"correlation-id": corrID,
	}

	clog := logger.NewWithContext(ctxVals)

	ctx = logger.NewContextWithLogger(ctx, clog)

	resp, err := handler(ctx, req)

	clog.DebugCtx("gRPC request", logger.Ctx{
		"method":  info.FullMethod,
		"req":     req,
		"resp":    resp,
		"took-ms": time.Since(t).Milliseconds(),
	})

	return resp, err
}

type ClientError struct {
	Req        interface{}   `json:"req"`
	Reply      interface{}   `json:"reply"`
	Method     string        `json:"method"`
	Service    string        `json:"service"`
	Message    string        `json:"message"`
	Details    []interface{} `json:"details"`
	StatusCode int           `json:"status_code"`
}

func (e *ClientError) Error() string {
	format := func(e *ClientError) string {
		out, err := json.Marshal(e)
		if err == nil {
			return string(out)
		}

		return "can't marshal struct"
	}

	return fmt.Sprintf("destination gRPC method returned an error: %s ", format(e))
}

func ClientErrorInterceptor(
	ctx context.Context,
	method string,
	req interface{},
	reply interface{},
	cc *grpc.ClientConn,
	invoker grpc.UnaryInvoker,
	opts ...grpc.CallOption,
) error {
	err := invoker(ctx, method, req, reply, cc, opts...)
	if err == nil {
		return nil
	}

	st := status.Convert(err)
	newErr := ClientError{
		Req:        req,
		Reply:      reply,
		Method:     method,
		Service:    cc.Target(),
		StatusCode: int(st.Code()),
		Message:    err.Error(),
		Details:    st.Details(),
	}

	return &newErr
}

func WithClientErrorInterceptor() grpc.DialOption {
	return grpc.WithUnaryInterceptor(ClientErrorInterceptor)
}

func ClientCtxPropagation(
	ctx context.Context,
	method string,
	req interface{},
	reply interface{},
	cc *grpc.ClientConn,
	invoker grpc.UnaryInvoker,
	opts ...grpc.CallOption,
) error {
	if md, ok := metadata.FromIncomingContext(ctx); ok {
		ctx = metadata.NewOutgoingContext(ctx, md)
	}

	// if there's no outgoing context generated from incoming context,
	// AppendToOutgoingContext creates a new outgoing context with correlation ID appended.
	if md, ok := metadata.FromOutgoingContext(ctx); !ok || len(md.Get(CorrelationIDCtxKey)) == 0 {
		ctx = metadata.AppendToOutgoingContext(ctx, CorrelationIDCtxKey, uuid.New().String())
	}

	return invoker(ctx, method, req, reply, cc, opts...)
}

func WithClientCtxPropagation() grpc.DialOption {
	return grpc.WithUnaryInterceptor(ClientCtxPropagation)
}

func getCorrelationIDFromIncomingContext(ctx context.Context) string {
	var correlationID string

	md, ok := metadata.FromIncomingContext(ctx)
	if ok {
		correlationIDCtxVal := md.Get(CorrelationIDCtxKey)
		if len(correlationIDCtxVal) > 0 {
			correlationID = correlationIDCtxVal[0]
		}
	}

	return correlationID
}
