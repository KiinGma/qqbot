package models

type TrainStation struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Code   string `json:"code"`
	PinYin string `json:"pin_yin"`
	PCode  string `json:"p_code"`
}
