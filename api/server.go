package main

import (
	"context"
	"fmt"
	"github.com/interviews/api/internal/config"
	"github.com/interviews/api/internal/questions"
	"github.com/interviews/api/internal/rest"
	"github.com/interviews/pkg/api"
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

	cfg, err := config.NewConfig()

	g, _ := errgroup.WithContext(ctx)

	apiConn, err := grpc.Dial(
		cfg.Server.ServerAddress,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithChainUnaryInterceptor())

	if err != nil {
		return err
	}
	defer apiConn.Close()

	listen, err := net.Listen("tcp", ":"+strconv.Itoa(cfg.Server.GRPCPort))
	if err != nil {
		return err
	}

	server := grpc.NewServer(grpc.ChainUnaryInterceptor())

	apiServer := questions.NewApiServiceServer()
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
