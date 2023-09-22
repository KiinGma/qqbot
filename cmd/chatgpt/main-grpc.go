package main

import (
	"fmt"
	"github.com/sashabaranov/go-openai"
	"github.com/shimingyah/pool"
	"google.golang.org/grpc"
	"google.golang.org/grpc/keepalive"
	"kiingma/cmd/chatgpt/proto/rest"
	"kiingma/cmd/chatgpt/service"
	"kiingma/pkg/appconfig"
	"log"
	"net"
)

func main() {
	appConfig := appconfig.LoadConfig()
	lis, err := net.Listen("tcp", ":"+appConfig.ChatGptRpcPort)
	if err != nil {
		log.Fatalf("net.Listen err: %v", err)
		return
	}
	server := grpc.NewServer(grpc.InitialWindowSize(pool.InitialWindowSize),
		grpc.InitialConnWindowSize(pool.InitialConnWindowSize),
		grpc.MaxSendMsgSize(pool.MaxSendMsgSize),
		grpc.MaxRecvMsgSize(pool.MaxRecvMsgSize),
		grpc.KeepaliveEnforcementPolicy(keepalive.EnforcementPolicy{
			PermitWithoutStream: true,
		}),
		grpc.KeepaliveParams(keepalive.ServerParameters{
			Time:    pool.KeepAliveTime,
			Timeout: pool.KeepAliveTimeout,
		}))
	config := appconfig.LoadConfig()
	client := openai.NewClient(config.OpenAiKey)
	sgc := service.NewChatGptStreamService(client)
	rest.RegisterChatGptServiceServer(server, sgc)

	err = server.Serve(lis)
	if err != nil {
		fmt.Println(err)
		return
	}
}
