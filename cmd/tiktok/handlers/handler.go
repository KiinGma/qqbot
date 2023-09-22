package handlers

import (
	"kiingma/cmd/tiktok/datastore"
	"kiingma/pkg/appconfig"
)

type Handler struct {
	Ds        datastore.DataStore
	AppConfig *appconfig.Config
	Cid       string
	AwemeId   string
}

func NewHandler(ds datastore.DataStore, config *appconfig.Config) *Handler {
	return &Handler{
		Ds:        ds,
		AppConfig: config,
	}
}
