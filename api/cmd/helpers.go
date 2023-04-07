package main

import (
	"fmt"
	log "github.com/interviews/utils/logger"
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

//nolint:unused // is not currently used but will be later..
func backgroundTask(fn func() error) {
	var wg sync.WaitGroup

	wg.Add(1)

	go func() {
		defer wg.Done()

		defer func() {
			err := recover()
			if err != nil {
				log.Error(fmt.Errorf("%s", err))
			}
		}()

		err := fn()
		if err != nil {
			log.Error(err)
		}
	}()
}
