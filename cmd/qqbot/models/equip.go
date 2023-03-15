package models

import "errors"

// 2:武器 3:衣服 4:手套 5:裤子 6:鞋子 7:首饰

type Equip struct {
	Id             uint64 `json:"id"`               //id,同用户id
	WeaponId       uint64 `json:"weapon_id"`        //武器
	WeaponName     string `json:"weapon_name"`      //武器
	WeaponSuitId   uint64 `json:"weapon_suit_id"`   //武器套装id
	ClothesId      uint64 `json:"clothes_id"`       //衣服
	ClothesName    string `json:"clothes_name"`     //衣服
	ClothesSuitId  uint64 `json:"clothes_suit_id"`  //衣服套装id
	GloveId        uint64 `json:"glove_id"`         //手套
	GloveName      string `json:"glove_name"`       //手套
	GloveSuitId    uint64 `json:"glove_suit_id"`    //手套套装id
	TrousersId     uint64 `json:"trousers_id"`      //裤子
	TrousersName   string `json:"trousers_name"`    //裤子
	TrousersSuitId uint64 `json:"trousers_suit_id"` //裤子套装id
	ShoeId         uint64 `json:"shoe_id"`          //鞋子
	ShoeName       string `json:"shoe_name"`        //鞋子
	ShoeSuitId     uint64 `json:"shoe_suit_id"`     //鞋子套装id
	RingId         uint64 `json:"ring_id"`          //首饰
	RingName       string `json:"ring_name"`        //首饰
	RingSuitId     uint64 `json:"ring_suit_id"`     //饰品套装id
	SuitId         uint64 `json:"suit_id"`          //套装信息,暂定一套
}

//更新装备,并输出被替换的装备id

func (e *Equip) Up(backpack Backpack) (exchange uint64, err error) {
	switch backpack.Type {
	case 2:
		exchange = e.WeaponId
		e.WeaponName = backpack.Name
		e.WeaponId = backpack.PropId
	case 3:
		exchange = e.ClothesId
		e.ClothesName = backpack.Name
		e.ClothesId = backpack.PropId
	case 4:
		exchange = e.GloveId
		e.GloveName = backpack.Name
		e.GloveId = backpack.PropId
	case 5:
		exchange = e.TrousersId
		e.TrousersName = backpack.Name
		e.TrousersId = backpack.PropId
	case 6:
		exchange = e.ShoeId
		e.ShoeName = backpack.Name
		e.ShoeId = backpack.PropId
	case 7:
		exchange = e.RingId
		e.RingName = backpack.Name
		e.RingId = backpack.PropId
	default:
		return 0, errors.New("不可穿戴")
	}
	return exchange, nil
}

func (e *Equip) GetEquipPart(name string) (id uint64, err error) {
	switch name {
	case e.WeaponName:
		id = e.WeaponId
		e.WeaponId = 0
		e.WeaponName = ""
	case e.ClothesName:
		id = e.ClothesId
		e.ClothesId = 0
		e.ClothesName = ""
	case e.GloveName:
		id = e.GloveId
		e.GloveId = 0
		e.GloveName = ""
	case e.TrousersName:
		id = e.TrousersId
		e.TrousersId = 0
		e.TrousersName = ""
	case e.ShoeName:
		id = e.SuitId
		e.SuitId = 0
		e.ShoeName = ""
	case e.RingName:
		id = e.RingId
		e.RingId = 0
		e.RingName = ""
	default:
		return 0, errors.New("不存在")
	}
	return
}

func (e *Equip) GetSuitMap() map[uint64]int {
	m := make(map[uint64]int)
	if e.WeaponSuitId != 0 {
		m[e.WeaponSuitId] += 1
	}
	if e.ShoeSuitId != 0 {
		m[e.ShoeSuitId] += 1
	}
	if e.GloveSuitId != 0 {
		m[e.GloveSuitId] += 1
	}
	if e.TrousersSuitId != 0 {
		m[e.TrousersSuitId] += 1
	}
	if e.ShoeSuitId != 0 {
		m[e.ShoeSuitId] += 1
	}
	if e.RingSuitId != 0 {
		m[e.RingSuitId] += 1
	}
	return m
}
