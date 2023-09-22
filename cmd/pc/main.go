package main

import (
	"fmt"
	"kiingma/cmd/pc/cmd"
	"kiingma/pkg/appconfig"
	"kiingma/pkg/ws_pkg"
)

func main() {
	config := appconfig.LoadConfig()
	go ws_pkg.WSClient(fmt.Sprintf("ws://%v:%v/ws/%v", config.APIHost, config.APIPort, config.WsId), nil)
	c := ws_pkg.GetClient()
	for {
		select {
		case m := <-c.Read:
			switch string(m) {
			case "关机":
				cmd.ShutdownComputer()
			}
		}
	}
}
