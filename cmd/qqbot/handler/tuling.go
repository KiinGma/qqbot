package handler

import (
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	"kiingma/cmd/qqbot/models"
)

func (h *WsHandler) TuLing(groupId, senderId uint64, message string) {
	reqBody := `{"reqType":0,"perception":{"inputText":{"text":"` + message + `"},"selfInfo":{"location":{"city":"北京","province":"北京","street":"信息路"}}},"userInfo":{"apiKey":"d73bcdfabbe64d62ad78a2cf89739bb7","userId":"431007"}}`
	res, _ := req.SetBodyString(reqBody).Post(`http://openapi.turingapi.com/openapi/api/v2`)
	body, _ := io.ReadAll(res.Body)
	result := gjson.GetBytes(body, "results.0.values.text").String()
	mcs := []models.MessageChain{
		{
			Type:   "At",
			Target: senderId,
		},
		{Type: "Plain", Text: " " + result},
	}
	h.client.SendGroupMessage(groupId, mcs)
}
