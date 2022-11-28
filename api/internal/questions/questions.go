package questions

import (
	"context"
	"github.com/interviews/pkg/api"
)

type apiServiceServer struct {
	api.UnimplementedApiServiceServer
}

func NewApiServiceServer() api.ApiServiceServer {
	return &apiServiceServer{}
}

func (s *apiServiceServer) Test(context context.Context, req *api.TestRequest) (*api.TestResponse, error) {
	println(req.Name)

	return &api.TestResponse{
		Name: "Drew Jocham",
		Age:  "37",
	}, nil
}
