package main

import (
	"fmt"
	"github.com/interviews/internal/config"
	"github.com/interviews/utils/logger"
	"sync"
)

/*
   backgroundTask()
   will automatically recover any panics in the background task logic,
   and when performing a graceful shutdown the application will wait for any
   background tasks to finish running before it exits.

   You can call this in your handlers, helpers and middleware
   to run any logic in a separate background goroutine.
*/

type application struct {
	config config.Config
	log    *logger.Logger
	wg     sync.WaitGroup
}

func (app *application) backgroundTask(fn func() error) {
	app.wg.Add(1)

	go func() {
		defer app.wg.Done()

		defer func() {
			err := recover()
			if err != nil {
				app.log.Error(fmt.Errorf("%s", err))
			}
		}()

		err := fn()
		if err != nil {
			app.log.Error(err)
		}
	}()
}
