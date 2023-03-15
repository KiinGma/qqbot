package main

import (
	"fmt"
	"qqbot/cmd/datastore"
	"qqbot/cmd/qqbot/server"
	"qqbot/pkg/appconfig"
)

func main() {

	//---------------
	// app config
	//---------------
	appConfig := appconfig.LoadCPGConfig()
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
