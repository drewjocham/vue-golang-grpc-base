package logger

import (
	"context"
)

type Key string

const ctxLoggerKey Key = "ctxlog"

func NewContextWithLogger(parentCtx context.Context, logger *Logger) context.Context {
	return context.WithValue(parentCtx, ctxLoggerKey, logger)
}

func GetLoggerFromContext(ctx context.Context) *Logger {
	ctxLogger := ctx.Value(ctxLoggerKey)

	logger, ok := ctxLogger.(*Logger)
	if !ok {
		return std
	}

	return logger
}
