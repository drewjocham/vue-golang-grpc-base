package errorutil

import (
	"errors"
	"github.com/interviews/utils/logger"

	"google.golang.org/grpc/codes"
)

type Ctx map[string]interface{}

func ErrInternal(err error) *logger.APIError {
	return logger.NewAPIError(err, int(codes.Internal), "Unexpected server error", nil)
}

func ErrUnauthorized(err error) *logger.APIError {
	return logger.NewAPIError(err, int(codes.PermissionDenied), "user is not authorized", nil)
}

func ErrUnauthenticated(err error) *logger.APIError {
	return logger.NewAPIError(err, int(codes.Unauthenticated), "user is not authenticated", nil)
}

func ErrInternalCtx(err error, ctx Ctx) *logger.APIError {
	return logger.NewAPIError(err, int(codes.Internal), "Unexpected server error", ctx)
}

func ErrBadRequest(err error, msg string) *logger.APIError {
	return logger.NewAPIError(err, int(codes.InvalidArgument), msg, nil)
}

func ErrBadRequestCtx(err error, msg string, ctx Ctx) *logger.APIError {
	return logger.NewAPIError(err, int(codes.InvalidArgument), msg, ctx)
}

func ErrNotFound(err error, msg string) *logger.APIError {
	return logger.NewAPIError(err, int(codes.NotFound), msg, nil)
}

func ErrNotFoundCtx(err error, msg string, ctx Ctx) *logger.APIError {
	return logger.NewAPIError(err, int(codes.NotFound), msg, ctx)
}

func ErrBadRequestMultiple(errs []error, outerErr error) *logger.APIError {
	if len(errs) == 0 {
		return nil
	}

	if len(errs) == 1 {
		return ErrBadRequest(errs[0], errs[0].Error())
	}

	tmp := outerErr.Error()
	for i := 0; i < len(errs); i++ {
		tmp += (", " + errs[i].Error())
	}

	return ErrBadRequest(outerErr, tmp)
}

func ErrCanceled(err error) *logger.APIError {
	return logger.NewAPIError(err, int(codes.Canceled), "operation was canceled", nil)
}

func ErrCanceledCtx(err error, ctx Ctx) *logger.APIError {
	return logger.NewAPIError(err, int(codes.Canceled), "operation was canceled", ctx)
}

func ErrConflict(err error, msg string) *logger.APIError {
	return logger.NewAPIError(err, int(codes.AlreadyExists), msg, nil)
}

func ErrConflictCtx(err error, msg string, ctx Ctx) *logger.APIError {
	return logger.NewAPIError(err, int(codes.AlreadyExists), msg, ctx)
}

// ErrValidation related to grpc.
var ErrValidation = errors.New("validation errors found")

func ValidationError(es []error) error {
	if len(es) == 1 {
		return ErrBadRequest(es[0], es[0].Error())
	}

	tmp := ErrValidation.Error()
	for i := 0; i < len(es); i++ {
		tmp += (", " + es[i].Error())
	}

	return ErrBadRequest(ErrValidation, tmp)
}
