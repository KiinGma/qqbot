package repository

import (
	"gorm.io/gorm"
	"kiingma/cmd/qqbot/models"
)

type YuanShenRepo struct {
	db *gorm.DB
}

func NewYuanShenRepo(db *gorm.DB) *YuanShenRepo {
	return &YuanShenRepo{db: db}
}

func (r *YuanShenRepo) GetOneGold(user *models.YuanShenGaChaLog) error {
	err := r.db.Order("time DESC").Where(user).First(user).Error
	return err
}

// GetNotGoldCount 多少发没出金
func (r *YuanShenRepo) GetNotGoldCount(time string) (int64, error) {
	var c int64
	err := r.db.Order("time DESC").Where("time > ? and rank_type != '5'", time).Model(models.YuanShenGaChaLog{}).Count(&c).Error
	return c, err
}
