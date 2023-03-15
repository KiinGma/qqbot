package handler

import (
	"qqbot/cmd/datastore"
	"qqbot/pkg/appconfig"
	"qqbot/pkg/wsservice"
)

type Handler struct {
	store     datastore.DataStore
	appConfig *appconfig.Config
	wsHub     *wsservice.WSHub
}

func NewHandler(ds datastore.DataStore, config *appconfig.Config, hub *wsservice.WSHub) *Handler {
	return &Handler{
		store:     ds,
		appConfig: config,
		wsHub:     hub,
	}
}
