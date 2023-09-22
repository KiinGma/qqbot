package handlers

import (
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/models"
)

type LedgerHandler struct {
	ds datastore.DataStore
}

func NewLedgerHandler(ds datastore.DataStore) *LedgerHandler {
	return &LedgerHandler{
		ds: ds,
	}
}

// GetUnpaidSystemLedger 获取未完成的订单
func (h *LedgerHandler) GetUnpaidSystemLedger(userId uint64) (*models.Ledger, error) {
	l, err := h.ds.LedgerService().GetUnpaidLedger(userId)
	return l, err
}

func (h *LedgerHandler) AddSystemLedger(l *models.Ledger) error {
	err := h.ds.Common().Create(l)
	return err
}
