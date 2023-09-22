package handlers

import (
	"github.com/gin-gonic/gin"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/global/errnos"
)

type ConfigHandler struct {
	ds datastore.DataStore
}

func NewConfigHandler(ds datastore.DataStore) *ConfigHandler {
	return &ConfigHandler{
		ds: ds,
	}
}

type config struct {
	NeedCode         bool `json:"needCode"`
	HideUserApiKey   bool `json:"hideUserApiKey"`
	EnableGPT4       bool `json:"enableGPT4"`
	HideBalanceQuery bool `json:"hideBalanceQuery"`
}

func (h *ConfigHandler) GetConfig(c *gin.Context) {
	conf := config{}

	errnos.Success(c, conf)
}
