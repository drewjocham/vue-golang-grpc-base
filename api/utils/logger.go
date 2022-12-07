package utils

import (
	"go.uber.org/zap"
)

var logger *zap.Logger

func InitializeLogger() {
	logger, _ = zap.NewProduction()
}
