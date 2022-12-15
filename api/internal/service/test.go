package service

import (
	"context"
	"github.com/interviews/proto/api"
	"github.com/interviews/utils/logger"
)

type apiServiceServer struct {
	api.UnimplementedApiServiceServer
}

func NewApiServiceServer() api.ApiServiceServer {
	return &apiServiceServer{}
}

func (s *apiServiceServer) Test(context context.Context, req *api.TestRequest) (*api.TestResponse, error) {
	clog := logger.GetLoggerFromContext(context)

	clog.Info("Received request...")

	return &api.TestResponse{
		Name:     "Drew ",
		LastName: "Jocham",
	}, nil
}
