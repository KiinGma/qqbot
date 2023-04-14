package service

import (
	"context"
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	proto "qqbot/cmd/chatgpt/proto/rest"
	"qqbot/pkg/appconfig"
)

type ChatGptService struct {
}

func (s *ChatGptService) GetChat(ctx context.Context, r *proto.ChatGptRequest) (*proto.ChatGptResponse, error) {
	res := proto.ChatGptResponse{}
	res.Response = getCompletions(r.Request)
	return &res, nil
}

func getCompletions(reqBody string) string {
	appConfig := appconfig.LoadCPGConfig()
	rsp, err := req.SetHeaders(map[string]string{"Authorization": "Bearer " + appConfig.OpenAiKey, "Content-Type": "application/json"}).SetBodyString(reqBody).Post(appConfig.OpenAiChatGptUrl)
	if err != nil {
		return "请求超时了"
	}
	body, err := io.ReadAll(rsp.Body)
	fmt.Println(string(body))
	return gjson.GetBytes(body, "choices.0.message.content").String()
}
