package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserIntegrate struct {
	Base
	ExternalID string `gorm:"uniqueIndex"`
	UserID     uint64
	Amount     int64
}

func (u *UserIntegrate) BeforeCreate(tx *gorm.DB) error {
	uid, err := uuid.NewUUID()
	if err != nil {
		return err
	}
	u.ExternalID = uid.String()
	return err
}
