package rest

import (
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/interviews/proto/api"
	"github.com/rs/cors"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/status"
	"net/http"
)

const (
	ErrUnavailable = "Service is temporarily available, Please try again later"
)

func RunHttpServer(server *http.Server, httpEndpoint, grpcEndpoint, swaggerPath string) (err error) {
	server.Addr = httpEndpoint

	ctx, cancel := context.WithCancel(context.Background())

	defer cancel()

	// Register gRPC server endpoint
	mux := runtime.NewServeMux(
		runtime.WithErrorHandler(func(ctx context.Context,
			mux *runtime.ServeMux,
			marshaler runtime.Marshaler,
			w http.ResponseWriter, r *http.Request,
			err error,
		) {
			s, ok := status.FromError(err)
			if ok {
				if s.Code() == codes.Unavailable {
					err = status.Error(codes.Unavailable, ErrUnavailable)
				}
			}

			runtime.DefaultHTTPErrorHandler(ctx, mux, marshaler, w, r, err)

		}),
	)

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithChainUnaryInterceptor(),
	}

	// Register the gRPC endpoints

	if err = api.RegisterApiServiceHandlerFromEndpoint(ctx, mux, grpcEndpoint, opts); err != nil {
		return
	}

	swMux := http.NewServeMux()
	swMux.Handle("/", mux)

	server.Handler = cors.AllowAll().Handler(swMux)

	serveSwagger(swMux, swaggerPath)

	return server.ListenAndServe()

}

func serveSwagger(mux *http.ServeMux, swaggerPath string) {
	fileServer := http.FileServer(http.Dir(swaggerPath))
	prefix := "/swagger-ui"
	mux.Handle(prefix, http.StripPrefix(prefix, fileServer))
}
