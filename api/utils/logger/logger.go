package logger

import (
	"errors"
	"net/http"
	"os"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"go.uber.org/zap/zaptest/observer"
	"google.golang.org/grpc/codes"
)

const timeFormat = "2006-01-02 15:04:05.999"

var std = new(2)

type Logger struct {
	zapLogger *zap.Logger
	logLevel  zap.AtomicLevel
}

type Ctx map[string]interface{}

func New() *Logger {
	return new(1)
}

func new(skipCaller int) *Logger {
	zLogLevel := zap.NewAtomicLevel()
	enc := newEncoder()
	core := zapcore.NewCore(enc, os.Stderr, zLogLevel)

	return &Logger{
		zapLogger: newZapLogger(core, skipCaller),
		logLevel:  zLogLevel,
	}
}

func NewTest() (*Logger, *observer.ObservedLogs) {
	zLogLevel := zap.NewAtomicLevel()
	core, observed := observer.New(zLogLevel)

	return &Logger{
		zapLogger: newZapLogger(core, 1),
		logLevel:  zLogLevel,
	}, observed
}

func newZapLogger(core zapcore.Core, skipCaller int) *zap.Logger {
	return zap.New(core, zap.AddCaller(), zap.AddCallerSkip(skipCaller))
}

func newEncoder() zapcore.Encoder {
	encCfg := zap.NewProductionEncoderConfig()
	encCfg.StacktraceKey = "" // disable stack trace
	encCfg.EncodeLevel = zapcore.CapitalLevelEncoder
	encCfg.EncodeTime = zapcore.TimeEncoder(func(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(t.UTC().Format(timeFormat))
	})

	return zapcore.NewJSONEncoder(encCfg)
}

func NewWithContext(ctx map[string]interface{}) *Logger {
	logger := *std

	fields := make([]zap.Field, 0, len(ctx))

	for k, v := range ctx {
		fields = append(fields, zap.Any(k, v))
	}

	logger.zapLogger = logger.zapLogger.With(fields...)

	return &logger
}

func (l *Logger) SetLevel(logLevel string) {
	switch logLevel {
	case "DEBUG":
		l.logLevel.SetLevel(zapcore.DebugLevel)
	case "INFO":
		l.logLevel.SetLevel(zapcore.InfoLevel)
	case "WARN":
		l.logLevel.SetLevel(zapcore.WarnLevel)
	case "ERROR":
		l.logLevel.SetLevel(zapcore.ErrorLevel)
	case "CRITICAL":
		l.logLevel.SetLevel(zapcore.FatalLevel)
	}
}

func (l *Logger) Debug(msg string) {
	l.zapLogger.Debug(msg)
}

func (l *Logger) DebugCtx(msg string, ctx Ctx) {
	fields := make([]zap.Field, 0, len(ctx))

	for k, v := range ctx {
		fields = append(fields, zap.Any(k, v))
	}

	l.zapLogger.Debug(msg, fields...)
}

func (l *Logger) Info(msg string) {
	l.zapLogger.Info(msg)
}

func (l *Logger) InfoCtx(msg string, ctx Ctx) {
	fields := make([]zap.Field, 0, len(ctx))

	for k, v := range ctx {
		fields = append(fields, zap.Any(k, v))
	}

	l.zapLogger.Info(msg, fields...)
}

func (l *Logger) Warn(msg string) {
	l.zapLogger.Warn(msg)
}

func (l *Logger) WarnCtx(msg string, ctx Ctx) {
	fields := make([]zap.Field, 0, len(ctx))

	for k, v := range ctx {
		fields = append(fields, zap.Any(k, v))
	}

	l.zapLogger.Warn(msg, fields...)
}

func (l *Logger) Error(err error) {
	l.errorCtx(err, nil)
}

func (l *Logger) ErrorCtx(err error, ctx Ctx) {
	l.errorCtx(err, ctx)
}

func (l *Logger) errorCtx(err error, ctx Ctx) {
	if err == nil {
		return
	}

	extCtx := []zap.Field{}
	for k, v := range ctx {
		extCtx = append(extCtx, zap.Any(k, v))
	}

	var apierr *APIError

	ok := errors.As(err, &apierr)
	if ok {
		l.apiError(apierr, extCtx)
	} else {
		l.zapLogger.WithOptions(zap.AddCallerSkip(1)).Error(err.Error(), extCtx...)
	}
}

func (l *Logger) apiError(err *APIError, extCtx []zap.Field) {
	fields := []zap.Field{
		zap.String("id", err.ID),
		zap.Int("status", err.Status),
		zap.String("method", err.Method),
		zap.NamedError("error", err.Cause),
	}

	for k, v := range err.Context {
		fields = append(fields, zap.Any(k, v))
	}

	fields = append(fields, extCtx...)

	if codes.Code(err.Status) == codes.Internal || err.Status == http.StatusInternalServerError {
		l.zapLogger.WithOptions(zap.AddCallerSkip(2)).Error(err.Message, fields...)
	} else {
		l.zapLogger.WithOptions(zap.AddCallerSkip(2)).Warn(err.Message, fields...)
	}
}

func (l *Logger) Fatal(err error) {
	if err == nil {
		return
	}

	l.zapLogger.Fatal(err.Error())
}

func SetLevel(logLevel string) {
	std.SetLevel(logLevel)
}

func Debug(msg string) {
	std.Debug(msg)
}

func DebugCtx(msg string, ctx Ctx) {
	std.DebugCtx(msg, ctx)
}

func Info(msg string) {
	std.Info(msg)
}

func InfoCtx(msg string, ctx Ctx) {
	std.InfoCtx(msg, ctx)
}

func Warn(msg string) {
	std.Warn(msg)
}

func WarnCtx(msg string, ctx Ctx) {
	std.WarnCtx(msg, ctx)
}

func Error(err error) {
	std.Error(err)
}

func ErrorCtx(err error, ctx Ctx) {
	std.ErrorCtx(err, ctx)
}

func Fatal(err error) {
	std.Fatal(err)
}
