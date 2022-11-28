package grpcutil

import (
	"context"
	"google.golang.org/grpc"
)

type ClientAuthentication interface {
	AuthenticationRequest(context.Context, string, interface{}, interface{},
		*grpc.ClientConn, grpc.UnaryInvoker, ...grpc.CallOption) error
}
