package main

import (
	"fmt"
	"google.golang.org/grpc"
	"log"
	"net"
	"qqbot/cmd/chatgpt/proto/rest"
	"qqbot/cmd/chatgpt/service"
	"qqbot/pkg/appconfig"
)

func main() {
	server := grpc.NewServer()
	appConfig := appconfig.LoadCPGConfig()
	rest.RegisterChatGptServiceServer(server, &service.ChatGptService{})
	lis, err := net.Listen("tcp", ":"+appConfig.ChatGptRpcPort)
	if err != nil {
		log.Fatalf("net.Listen err: %v", err)
		return
	}
	err = server.Serve(lis)
	if err != nil {
		fmt.Println(err)
		return
	}
}
