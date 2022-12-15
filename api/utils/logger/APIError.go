package logger

import (
	"time"

	"github.com/google/uuid"
)

// APIError is application-specific error type
type APIError struct {
	// Error ID (UUID)
	ID string `json:"id"`
	// Public error message
	Message string `json:"msg"`
	// Status code to be returned
	Status int `json:"-"`
	// Method of service where error is occurred
	Method string `json:"-"`
	// Error time
	Timestamp time.Time `json:"-"`
	// Error details including stack trace and inner errors (not exposed to end user)
	Cause error `json:"-"`
	// Extra information about error context (not exposed to end user)
	Context map[string]interface{} `json:"-"`
}

// NewAPIError creates a new API error
func NewAPIError(cause error, status int, msg string, context map[string]interface{}) *APIError {
	var id string

	newUUID, err := uuid.NewRandom()
	if err == nil {
		id = newUUID.String()
	}

	return &APIError{
		ID:        id,
		Status:    status,
		Message:   msg,
		Cause:     cause,
		Timestamp: time.Now(),
		Context:   context,
	}
}

// Error returns string representation of APIError
func (e *APIError) Error() string {
	return e.Message
}

// AddCtx adds a key-value pair to error context
func (e *APIError) AddCtx(key string, value interface{}) {
	if e.Context == nil {
		e.Context = map[string]interface{}{}
	}

	e.Context[key] = value
}
