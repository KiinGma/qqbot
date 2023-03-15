package models

import (
	"encoding/json"
	"time"
)

type SimpleIntegrate struct {
	Id    uint64 `json:"-"`
	Score int64  `json:"score"`
}

type Integrate struct {
	Id                  uint64    `json:"-"`
	Score               int64     `json:"score"`
	LastSignInTime      time.Time `json:"last_sign_in_time"`
	ContinuousSignTimes int64     `json:"continuous_sign_times"` //连续签到天数
	LastLootTime        time.Time `json:"last_loot_time"`        //最后打劫的时间
	Luck                int64     `json:"luck"`                  //求签幸运值
	LastLuckTime        time.Time `json:"last_luck_time"`        //上一次求签时间
}

func (i *Integrate) ToJson() []byte {
	data, _ := json.Marshal(i)
	return data
}

func (i *Integrate) ToStruct(data []byte) {
	_ = json.Unmarshal(data, i)
}

type BegMap struct {
	Id       uint64
	GroupID  uint64
	Name     string
	SumScore int64
	Times    int
}
