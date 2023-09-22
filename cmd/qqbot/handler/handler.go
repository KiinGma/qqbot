package handler

import (
	"kiingma/cmd/datastore"
	"kiingma/pkg/appconfig"
)

type Handler struct {
	store     datastore.DataStore
	appConfig *appconfig.Config
}

func NewHandler(ds datastore.DataStore, config *appconfig.Config) *Handler {
	return &Handler{
		store:     ds,
		appConfig: config,
	}
}
