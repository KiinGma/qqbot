package models

type Commodity struct {
	Base
	Name   string `json:"name"`
	Count  int64  `json:"count"`
	Price  int64  `json:"price"`
	PropId uint64 `json:"prop_id"`
	Owner  uint64 `json:"owner"`
}
