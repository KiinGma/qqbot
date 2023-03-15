package handler

import (
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	"qqbot/cmd/qqbot/models"
	"qqbot/pkg/appconfig"
)

var ChatMap map[uint64][]models.ChatGptMessage

func (h *WsHandler) ChatGpt(resp models.RespMessage) {
	for _, v := range resp.Data.MessageChain {
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
			case " 会话清除", "会话清除", "清除", "清除会话", " 清除会话", "清除上下文", " 清除上下文":
				delete(ChatMap, h.sendId)
				h.client.SendGroupMessageWithString(h.Gid, h.sendId, " chatgpt上下文已清除")
			case " 重新生成", "重新生成", "重写", " 重写":
				ChatMap[h.sendId] = DelAfterChatSession(ChatMap[h.sendId])
				h.client.SendGroupMessageWithString(h.Gid, h.sendId, "  "+SendMapChat(h.sendId, ChatMap[h.sendId]))
			default:
				h.client.SendGroupMessageWithString(h.Gid, h.sendId, "  "+SendSessionChat(h.sendId, v.Text))
			}
		}
	}
}

//发送原来的记录给chatgpt

func SendSessionChat(user uint64, text string) string {
	c := models.ChatGpt{}
	c.Model = "gpt-3.5-turbo"
	if ChatMap == nil {
		ChatMap = make(map[uint64][]models.ChatGptMessage, 0)
	}
	c.Messages = AddChatSession(ChatMap[user], models.ChatGptMessage{Role: "user", Content: text})
	m := getCompletions(c)
	ChatMap[user] = AddChatSession(c.Messages, models.ChatGptMessage{Role: "assistant", Content: m})
	return m
}

func SendMapChat(user uint64, m []models.ChatGptMessage) string {
	c := models.ChatGpt{}
	c.Model = "gpt-3.5-turbo"
	c.Messages = m
	msg := getCompletions(c)
	ChatMap[user] = AddChatSession(c.Messages, models.ChatGptMessage{Role: "assistant", Content: msg})
	return msg
}

// 调用chat gpt api

func getCompletions(reqBody models.ChatGpt) string {
	appConfig := appconfig.LoadCPGConfig()
	rsp, err := req.SetHeaders(map[string]string{"Authorization": "Bearer " + appConfig.OpenAiKey, "Content-Type": "application/json"}).SetBodyString(reqBody.ToJsonString()).Post("https://api.openai.com/v1/chat/completions")
	if err != nil {
		return "请求超时了"
	}
	body, err := io.ReadAll(rsp.Body)
	fmt.Println(string(body))
	return gjson.GetBytes(body, "choices.0.message.content").String()
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
