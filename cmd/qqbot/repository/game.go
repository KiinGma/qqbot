package repository

import (
	"gorm.io/gorm"
	"qqbot/cmd/qqbot/models"
)

type GameRepo struct {
	db *gorm.DB
}

func NewGameRepo(db *gorm.DB) *GameRepo {
	return &GameRepo{db: db}
}

func (d *GameRepo) UpdateIntegrateScoreById(id uint64, score int64) error {
	return d.db.Exec("update integrates set score = score+? where id=?", score, id).Error
}

func (d *GameRepo) GetAllCommodities(filter models.Commodity) (commodities []models.Commodity, err error) {
	err = d.db.Where(filter).Find(&commodities).Error
	return commodities, err
}

func (d *GameRepo) UpdateAttributes(id uint64, attributes models.Attributes) error {
	return d.db.Exec("update basic_attributes set experience = experience+? , level = level+? , life = life+? , speed = speed+? , magic = magic+? , armor = armor+? , attack = attack+? , magic_resist = magic_resist+? , luck = luck+? where id=?", attributes.Experience, attributes.Level, attributes.Life, attributes.Speed, attributes.Magic, attributes.Armor, attributes.Attack, attributes.MagicResist, attributes.Luck, id).Error
}
