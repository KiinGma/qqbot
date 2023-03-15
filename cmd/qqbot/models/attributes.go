package models

//人物通用属性

type BasicAttributes struct {
	Id uint64 `json:"id"`
	Attributes
}

//通用属性

type Attributes struct {
	Experience  int64 `json:"experience"`
	Level       int64 `json:"level"`
	Life        int64 `json:"life"`
	Speed       int64 `json:"speed"`
	Magic       int64 `json:"magic"`
	Armor       int64 `json:"armor"`
	Attack      int64 `json:"attack"`
	MagicResist int64 `json:"magic_resist"`
	Luck        int64 `json:"luck"`
}

func (b *BasicAttributes) DeductBySuit(attributes Attributes) {
	b.Magic -= attributes.Magic
	b.Armor -= attributes.Armor
	b.Attack -= attributes.Attack
	b.Life -= attributes.Life
	b.Speed -= attributes.Speed
	b.MagicResist -= attributes.MagicResist
	b.Luck -= attributes.Luck
}

func (b *BasicAttributes) AddBySuit(attributes Attributes) {
	b.Magic += attributes.Magic
	b.Armor += attributes.Armor
	b.Attack += attributes.Attack
	b.Life += attributes.Life
	b.Speed += attributes.Speed
	b.MagicResist += attributes.MagicResist
	b.Luck += attributes.Luck
}
