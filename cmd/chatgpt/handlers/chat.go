package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
	"io"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/global/errnos"
	"kiingma/cmd/chatgpt/middleware/jwt"
	"kiingma/cmd/chatgpt/proto/rest"
)

type ChatHandler struct {
	ds  datastore.DataStore
	ch  *ChatGptHandler
	lol *LOLHandler
}

func NewChatHandler(ds datastore.DataStore, grpcClient rest.ChatGptServiceClient, uih *UserIntegrateHandler, lh *LOLHandler) *ChatHandler {
	return &ChatHandler{
		ds:  ds,
		ch:  NewChatGptHandler(ds, grpcClient, uih),
		lol: lh,
	}
}

func (h *ChatHandler) Chat(c *gin.Context) {
	raw, err := io.ReadAll(c.Request.Body)
	if err != nil {
		errnos.Fail(c)
		return
	}
	val, ex := c.Get("token")
	if !ex {
		errnos.ErrorTokenAuthFail(c)
		return
	}
	token := val.(jwt.CustomClaims)

	fmt.Println(token.UserId)
	if err != nil {
		errnos.Fail(c)
		return
	}
	model := gjson.GetBytes(raw, "model").String()
	if model == "" {
		errnos.ErrorModelNotFound(c)
		return
	}
	switch model {
	case "gpt-3.5-turbo-0301", "gpt-3.5-turbo-0613", "gpt-3.5-turbo", "gpt-3.5-turbo-16k", "gpt-3.5-turbo-16k-0631":
		h.ch.ChatCompletion(c, raw)
	case "lol":
		h.lol.Handle(c, raw)
	default:
		errnos.ErrorModelNotFound(c)
		return
	}
}
