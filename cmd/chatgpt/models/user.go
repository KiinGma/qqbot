package models

import (
	"fmt"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"strconv"
	"time"
)

type User struct {
	Base
	ExternalID     string      `json:"externalID" gorm:"uniqueIndex"`
	UserName       string      `json:"username"`
	Password       string      `json:"password"`
	NickName       string      `json:"nickname"`
	IpAddr         string      `json:"ip_addr"`
	Email          string      `json:"email"`
	LastActiveTime time.Time   `json:"last_active_time"`
	Avatar         string      `json:"avatar"`
	ValidatorUntil time.Time   `json:"validator_until"`
	Remark         string      `json:"remark"`
	IsSuperuser    bool        `json:"is_superuser"`
	IsActive       bool        `json:"is_active"`
	IsVerified     bool        `json:"is_verified"`
	HashedPassword string      `json:"hashed_password" gorm:"uniqueIndex"`
	Setting        UserSetting `json:"UserSetting"`
}

type UserSetting struct {
	Base
	UserId  uint64  `json:"user_id"`
	Credits float64 `json:"credits"`
}

type BaseConversation struct {
	Base
	Source         any    `json:"source"`
	ConversationId string `json:"conversation_id"`
	CurrentModel   string `json:"current_model"`
	Title          string `json:"title"`
	UserId         uint64 `json:"user_id"`
	IsValid        bool   `json:"is_valid"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	uid, err := uuid.NewUUID()
	if err != nil {
		return err
	}
	u.ExternalID = uid.String()
	return err
}

func (u *User) AfterCreate(tx *gorm.DB) error {
	fmt.Printf("插入后的ID为：%d\n", u.ID)
	return nil
}

func (u *User) GetStringId() string {
	return strconv.FormatUint(u.ID, 10)
}
