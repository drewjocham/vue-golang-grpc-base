package main

import (
	"context"
	"fmt"
	"github.com/interviews/internal/config"
	"github.com/interviews/internal/service"
	"github.com/interviews/utils/logger"
	"os"
	"os/signal"
	"syscall"
	"time"

	grpc_prometheus "github.com/grpc-ecosystem/go-grpc-prometheus"
	"github.com/interviews/internal/rest"
	"github.com/interviews/proto/api"
	"github.com/prometheus/client_golang/prometheus/promhttp"
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

	g, egCtx := errgroup.WithContext(ctx)

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
			//TODO: create a error handler
		}
	}(apiConn)

	listen, err := net.Listen("tcp", ":"+strconv.Itoa(cfg.Server.GRPCPort))
	if err != nil {
		return err
	}

	server := grpc.NewServer(grpc.ChainUnaryInterceptor())

	apiServer := service.NewApiServiceServer()

	api.RegisterApiServiceServer(server, apiServer)

	// metricsReaderTimeout is used to timeout prometheus requests for collection of metrics.
	const metricsReaderTimeout = 1 * time.Second

	// Initialize metrics handler
	grpc_prometheus.Register(server)
	grpc_prometheus.EnableHandlingTimeHistogram()
	grpc_prometheus.EnableClientHandlingTimeHistogram()

	metricsMux := http.NewServeMux()
	metricsMux.Handle("/metrics", promhttp.Handler())

	metricsServer := &http.Server{
		Addr:              ":" + strconv.Itoa(cfg.Server.MetricsPort),
		Handler:           metricsMux,
		ReadHeaderTimeout: metricsReaderTimeout,
	}

	// HTTP server for REST API
	var httpServer http.Server

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		gracefulShutdown := func() {
			err := httpServer.Shutdown(context.Background())
			if err != nil {
				return
			}
			clog.Info("shutting down gRPC server")
			server.GracefulStop()
			clog.Info("shutting down metrics server")
			err = metricsServer.Shutdown(context.Background())
			if err != nil {
				return
			}
			clog.Info("canceling the main context")
			cancel()
		}

		select {
		case s := <-c:
			_ = fmt.Errorf(s.String()) //TODO: this is not right
			gracefulShutdown()
		case <-egCtx.Done():
			clog.Info("error group has been canceled")
			gracefulShutdown()
		}
	}()

	// GRPC server
	g.Go(func() error {
		fmt.Println("Starting server on port", strconv.Itoa(cfg.Server.GRPCPort))

		return server.Serve(listen)
	})

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
