package service

import (
	"fmt"
	"gorm.io/gorm"
	"kiingma/cmd/chatgpt/models"
	"kiingma/cmd/chatgpt/repository"
	"time"
)

type LedgerService interface {
	GetUnpaidLedger(userID uint64) (*models.Ledger, error)
}

type ledgerService struct {
	commonRepo *repository.CommonRepo
}

func NewLedgerService(db *gorm.DB) LedgerService {
	return &ledgerService{
		commonRepo: repository.NewCommonRepo(db),
	}
}

// GetUnpaidLedger 获取未过期且未完成的支付记录
func (s *ledgerService) GetUnpaidLedger(userID uint64) (*models.Ledger, error) {
	l := models.Ledger{}
	err := s.commonRepo.GetFirstByWhere(&l, fmt.Sprintf("user_id= %v and time_expire>%v and trade_status= '%v'", userID, time.Now().Unix(), models.TradeStatusWaitBuyerPay))
	return &l, err
}
