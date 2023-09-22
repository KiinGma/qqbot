package main

import (
	"fmt"
	"kiingma/cmd/datastore"
	"kiingma/cmd/qqbot/server"
	"kiingma/pkg/appconfig"
)

func main() {

	//---------------
	// app config
	//---------------
	appConfig := appconfig.LoadConfig()
	fmt.Printf("starting service %s api ...", appConfig.Environment)
	//---------
	// Database
	//---------
	store, err := datastore.NewStore(appConfig)
	if err != nil {
		fmt.Println(err)
		return
	}

	//rds := datastore.InstanceCache(appConfig)

	//test.CreateCategory(store)
	//test.CreateProductCategory(store)

	Server := server.NewServer(store, appConfig)

	_ = Server.Run(appConfig.ServerPort)
}
