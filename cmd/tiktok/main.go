package main

import (
	"fmt"
	"kiingma/cmd/tiktok/datastore"
	"kiingma/cmd/tiktok/handlers"
	"kiingma/pkg/appconfig"
	"time"
)

func main() {
	appConfig := appconfig.LoadConfig()
	ds, err := datastore.NewStore(appConfig)
	if err != nil {
		fmt.Println(err)
		return
	}
	h := handlers.NewHandler(ds, appConfig)
	handlers.GetSecsdkCsrfToken(h)
	go func() {
		for {
			time.Sleep(time.Hour * 5)
			handlers.GetSecsdkCsrfToken(h)
		}
	}()
	handlers.Replay(*h)
}
