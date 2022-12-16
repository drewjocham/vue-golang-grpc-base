package main

import (
	"context"
	"fmt"
	"github.com/interviews/internal/config"
	"github.com/interviews/internal/rest"
	"github.com/interviews/internal/service"
	"github.com/interviews/proto/api"
	"github.com/interviews/utils/logger"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"net"
	"net/http"
	"strconv"
)

func startServer() error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	clog := logger.GetLoggerFromContext(ctx)

	cfg, err := config.NewConfig()
	if err != nil {
		return err
	}

	g, _ := errgroup.WithContext(ctx)

	apiConn, err := grpc.Dial(
		cfg.Server.ServerAddress,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithChainUnaryInterceptor())

	if err != nil {
		return err
	}
	defer func(apiConn *grpc.ClientConn) {
		err := apiConn.Close()
		if err != nil {
			clog.Error(err)
		}
	}(apiConn)

	listen, err := net.Listen("tcp", ":"+strconv.Itoa(cfg.Server.GRPCPort))
	if err != nil {
		return err
	}

	server := grpc.NewServer(grpc.ChainUnaryInterceptor())

	apiServer := service.NewApiServiceServer()

	api.RegisterApiServiceServer(server, apiServer)

	// GRPC server
	g.Go(func() error {
		fmt.Println("Starting server on port", strconv.Itoa(cfg.Server.GRPCPort))

		return server.Serve(listen)
	})

	var httpServer http.Server

	// Run Http Server with gRPC gateway
	g.Go(func() error {
		fmt.Println("Starting Http sever (port {}) and gRPC gateway (port {})",
			strconv.Itoa(cfg.Server.HTTPPort),
			strconv.Itoa(cfg.Server.GRPCPort),
		)

		return rest.RunHttpServer(
			&httpServer,
			":"+strconv.Itoa(cfg.Server.HTTPPort),
			":"+strconv.Itoa(cfg.Server.GRPCPort),
			"/webapi",
		)
	})

	return g.Wait()

}

func main() {

	err := startServer()
	if err != nil {
		return
	}

}
