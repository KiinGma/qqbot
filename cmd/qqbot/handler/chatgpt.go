package handler

import (
	"context"
	"fmt"
	"github.com/shimingyah/pool"
	"google.golang.org/grpc"
	"google.golang.org/grpc/keepalive"
	"kiingma/cmd/chatgpt/proto/rest"
	"kiingma/cmd/qqbot/models"
	"kiingma/pkg/appconfig"
	"log"
	"sync"
	"time"
)

var ChatMap map[uint64][]models.ChatGptMessage

func ChatGpt(h WsHandler) {
	for _, v := range h.resp.Data.MessageChain {
		switch v.Type {
		case "Quote":
			for i := range v.Origin {
				if ChatMap == nil {
					ChatMap = make(map[uint64][]models.ChatGptMessage, 0)
				}
				//根据id获取问题
				cs := h.client.GetMessageFromId(v.Id, h.Gid)
				for _, chain := range cs {
					if chain.Type == "At" {
						if ChatMap[chain.Target] != nil && len(ChatMap[chain.Target]) > 1 {
							fmt.Println(ChatMap[chain.Target])
							ChatMap[h.sendId] = AddChatSession(ChatMap[h.sendId], ChatMap[chain.Target][len(ChatMap[chain.Target])-2])
						}
					}
				}
				//加入上一个问题
				ChatMap[h.sendId] = AddChatSession(ChatMap[h.sendId], models.ChatGptMessage{Role: "assistant", Content: v.Origin[i].Text})
			}
		case "Plain":
			switch v.Text {
			case " 会话清除", "会话清除", "清除", " 清除", "清除会话", " 清除会话", "清除上下文", " 清除上下文":
				delete(ChatMap, h.sendId)
				if h.resp.Data.Type == "TempMessage" {
					mcs := []models.MessageChain{
						{Type: "Plain", Text: " 上下文已清除"},
					}
					h.client.SendTempMessage(h.Gid, h.sendId, mcs)
				} else if h.resp.Data.Type == "FriendMessage" {
					h.client.SendFriendMessageWithString(h.sendId, " 上下文已清除")
				} else if h.resp.Data.Type == "GroupMessage" {
					h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 上下文已清除")
				}
			case " 重新生成", "重新生成", "重写", " 重写":
				_, has := ChatMap[h.sendId]
				if !has {
					return
				}
				ChatMap[h.sendId] = DelAfterChatSession(ChatMap[h.sendId])
				if h.resp.Data.Type == "TempMessage" {
					mcs := []models.MessageChain{
						{Type: "Plain", Text: SendSessionChat(h.sendId, v.Text)},
					}
					h.client.SendTempMessage(h.Gid, h.sendId, mcs)
				} else if h.resp.Data.Type == "FriendMessage" {
					h.client.SendFriendMessageWithString(h.sendId, SendSessionChat(h.sendId, v.Text))
				} else if h.resp.Data.Type == "GroupMessage" {
					h.client.SendGroupMessageWithString(h.Gid, h.sendId, "  "+SendSessionChat(h.sendId, v.Text))
				}
			default:
				if slip(v.Text) {
					return
				}
				//发送消息
				if h.resp.Data.Type == "TempMessage" {
					mcs := []models.MessageChain{
						{Type: "Plain", Text: SendSessionChat(h.sendId, v.Text)},
					}
					h.client.SendTempMessage(h.Gid, h.sendId, mcs)
				} else if h.resp.Data.Type == "FriendMessage" {
					h.client.SendFriendMessageWithString(h.sendId, SendSessionChat(h.sendId, v.Text))
				} else if h.resp.Data.Type == "GroupMessage" {
					h.client.SendGroupMessageWithString(h.Gid, h.sendId, "  "+SendSessionChat(h.sendId, v.Text))
				}
			}
		}
	}
}

//发送原来的记录给chatgpt

func SendSessionChat(user uint64, text string) string {
	c := models.ChatGpt{}
	c.Model = "gpt-3.5-turbo-16k"
	if ChatMap == nil {
		ChatMap = make(map[uint64][]models.ChatGptMessage, 0)
	}
	c.Messages = AddChatSession(ChatMap[user], models.ChatGptMessage{Role: "user", Content: text})

	m := getCompletions(c)

	ChatMap[user] = AddChatSession(c.Messages, models.ChatGptMessage{Role: "assistant", Content: m})
	return m
}

// 调用chat gpt api, 并在这里处理一些错误

func getCompletions(reqBody models.ChatGpt) string {
	client := rest.NewChatGptServiceClient(GetGrpcClient())
	resp, err := client.GetChat(context.Background(), &rest.ChatGptRequest{
		Request: reqBody.ToJsonString(),
	})
	if err != nil {
		fmt.Println(err)
		return "请求超时"
	}
	CResp := models.ChatGptResponse{}
	CResp.ToJson([]byte(resp.Response))
	if CResp.Error.Code != "" {
		return CResp.Error.Message
	}
	if len(CResp.Choices) == 0 {
		return "没有信息生成"
	}
	return CResp.Choices[0].Message.Content
}

// 清除会话队列的第一位并在末位添加一个新数组(伪栈写法)

func AddChatSession(inSlice []models.ChatGptMessage, message models.ChatGptMessage) (outSlice []models.ChatGptMessage) {
	if len(inSlice) > 200 {
		outSlice = inSlice[1:]
		outSlice = append(inSlice, message)
	} else {
		outSlice = append(inSlice, message)
	}
	return
}

//删除上一个会话内容

func DelAfterChatSession(inSlice []models.ChatGptMessage) (outSlice []models.ChatGptMessage) {
	if len(inSlice) == 0 {
		return
	}
	outSlice = inSlice[:len(inSlice)-1]
	return
}

//tokens检测,超过阀值就会被替换

// chatGpt rpc 服务
var (
	grpcOnce sync.Once
	poolConn pool.Pool
)

func GetGrpcClient() *grpc.ClientConn {
	appConfig := appconfig.LoadConfig()
	grpcOnce.Do(func() {
		var err error
		//grpc 服务器的地址或者 服务注册中心的地址
		address := appConfig.ChatGptRpcHost + ":" + appConfig.ChatGptRpcPort
		poolConn, err = pool.New(address, pool.Options{
			Dial:                 pool.Dial,
			MaxIdle:              8,
			MaxActive:            64,
			MaxConcurrentStreams: 64,
			Reuse:                true,
		})
		if err != nil {
			log.Fatalf("failed to new pool: %v", err)
		}
	})
	conn, err := poolConn.Get()
	if err != nil {
		log.Fatalf("failed to get conn: %v", err)
	}
	return conn.Value()
}

const (
	// DialTimeout the timeout of create connection
	DialTimeout = 10 * time.Second

	// BackoffMaxDelay provided maximum delay when backing off after failed connection attempts.
	BackoffMaxDelay = 10 * time.Second

	// KeepAliveTime is the duration of time after which if the client doesn't see
	// any activity it pings the server to see if the transport is still alive.
	KeepAliveTime = time.Duration(10) * time.Second

	// KeepAliveTimeout is the duration of time for which the client waits after having
	// pinged for keepalive check and if no activity is seen even after that the connection
	// is closed.
	KeepAliveTimeout = time.Duration(10) * time.Second

	// InitialWindowSize we set it 1GB is to provide system's throughput.
	InitialWindowSize = 1 << 30

	// InitialConnWindowSize we set it 1GB is to provide system's throughput.
	InitialConnWindowSize = 1 << 30

	// MaxSendMsgSize set max gRPC request message size sent to server.
	// If any request message size is larger than current value, an error will be reported from gRPC.
	MaxSendMsgSize = 4 << 30

	// MaxRecvMsgSize set max gRPC receive message size received from server.
	// If any message size is larger than current value, an error will be reported from gRPC.
	MaxRecvMsgSize = 4 << 30
)

func Dial(address string) (*grpc.ClientConn, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DialTimeout)
	defer cancel()
	return grpc.DialContext(ctx, address, grpc.WithInsecure(),
		grpc.WithBackoffMaxDelay(BackoffMaxDelay),
		grpc.WithInitialWindowSize(InitialWindowSize),
		grpc.WithInitialConnWindowSize(InitialConnWindowSize),
		grpc.WithDefaultCallOptions(grpc.MaxCallSendMsgSize(MaxSendMsgSize)),
		grpc.WithDefaultCallOptions(grpc.MaxCallRecvMsgSize(MaxRecvMsgSize)),
		grpc.WithKeepaliveParams(keepalive.ClientParameters{
			Time:                KeepAliveTime,
			Timeout:             KeepAliveTimeout,
			PermitWithoutStream: true,
		}))
}

// 让gpt忽略一些指令
func slip(s string) bool {
	switch s {
	case "关机", "":
		return true
	}
	return false
}
