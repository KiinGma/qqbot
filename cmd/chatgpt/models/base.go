package models

// Base replaces gorm.Model to support UUID
type Base struct {
	ID         uint64 `gorm:"primary_key;auto_increment"`
	CreateTime int64  `gorm:"autoCreateTime"`
	UpdateTime int64  `gorm:"autoUpdateTime"`
}
