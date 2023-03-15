package models

type Suit struct {
	Id          uint64 `json:"id"`
	SuitId      uint64 `json:"suit_id"`
	Count       int    `json:"count"`
	Description string `json:"description"`
	Attributes
}
