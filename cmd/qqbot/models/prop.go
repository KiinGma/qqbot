package models

//背包

type Backpack struct {
	Count    int64  `json:"count"`
	HolderID uint64 `json:"holder_id"` //持有者
	Prop
}

//道具

type Prop struct {
	PropId      uint64 `json:"prop_id" gorm:"primary_key"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Price       int64  `json:"price"`
	Type        int    `json:"type"` //应用限制 (1:打劫 2:武器 3:衣服 4:手套 5:裤子 6:鞋子 7:首饰 8:食物)
	Attributes
}
