package service

import (
	"gorm.io/gorm"
	"kiingma/cmd/qqbot/models"
	"kiingma/cmd/qqbot/repository"
)

type YuanShenService interface {
	GetOneGold(user *models.YuanShenGaChaLog) error
	GetNotGoldCount(time string) (int64, error)
}

type yuanShenService struct {
	yuanShenRepo *repository.YuanShenRepo
}

func NewYuanShenService(db *gorm.DB) YuanShenService {
	return &yuanShenService{
		yuanShenRepo: repository.NewYuanShenRepo(db),
	}
}

func (s *yuanShenService) GetOneGold(user *models.YuanShenGaChaLog) error {
	return s.yuanShenRepo.GetOneGold(user)
}

func (s *yuanShenService) GetNotGoldCount(time string) (int64, error) {
	return s.yuanShenRepo.GetNotGoldCount(time)
}
