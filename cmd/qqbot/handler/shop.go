package handler

import (
	"fmt"
	"gorm.io/gorm"
	"qqbot/cmd/qqbot/models"
	"qqbot/cmd/qqbot/repository"
	"regexp"
	"strconv"
	"strings"
)

func (h *WsHandler) Shop() {
	for _, v := range h.resp.Data.MessageChain {
		switch {
		case v.Text == "商店":
			GetShop(h)
		case regexp.MustCompile(`^上架\s\S*\s[0-9]+$|上架\s\S*`).MatchString(v.Text):
			Sell(h, v.Text)
		case regexp.MustCompile(`^下架\s\S*\s[0-9]+$|下架\s\S*`).MatchString(v.Text):
			SoldOut(h, v.Text)
		case regexp.MustCompile(`^购买\s\S*\s[0-9]+$|购买\s\S*`).MatchString(v.Text):
			Buy(h, v.Text)
		}
	}
}

// 获取商店信息

func GetShop(h *WsHandler) {
	t := 0
	format := "\t"
	cs := make([]models.Commodity, 0)
	h.Ds.Common().GetAllWithFilter(repository.Filters{}, nil, &cs)
	mcs := make([]models.MessageChain, 0)
	if len(cs) != 0 {
		for _, v := range cs {
			mc := models.MessageChain{
				Type: "Plain", Text: fmt.Sprintf(" \n[ %v * %v 价格: %v]", v.Name, v.Count, v.Price),
			}
			mcs = append(mcs, mc)
			if len(mc.Text) > t {
				t = len(mc.Text)
			}
		}
	} else {
		mcs = append(mcs, models.MessageChain{
			Type: "Plain", Text: fmt.Sprintf(" \n\t空 "),
		})
	}
	//清理格式
	if t > 14 {
		t = 14
	}
	t = t / 8
	for i := 0; i < t; i++ {
		format += "\t"
	}
	mcs = append([]models.MessageChain{
		{
			Type: "Plain", Text: fmt.Sprintf("%v🏬商店 ", format),
		},
	}, mcs...)
	h.client.SendGroupMessage(h.Gid, mcs)

}

//上架 旧报纸 1

func Sell(h *WsHandler, text string) {
	// 拆分格式
	textSp := strings.Split(text, " ")
	if len(textSp) < 2 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 格式错误 , 商店上架物品的格式为 [上架 物品 数量]"))
		return
	}
	var num int64 = 1
	//检查数量是否是对的格式
	if len(textSp) == 3 {
		num, _ = strconv.ParseInt(textSp[2], 10, 64)
	}

	if num < 1 {
		num = 1
	}

	//查询玩家背包是否拥有此物品
	b := models.Backpack{
		HolderID: h.sendId,
		Prop: models.Prop{
			Name: textSp[1],
		},
	}

	err := h.Ds.GameService().GetBackpack(&b)
	//没有这个物品的
	if err == gorm.ErrRecordNotFound {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你的背包没有这个物品"))
		return
	}

	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
		return
	}

	//上架数量超过的
	if b.Count < num {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 出售物品数量超出"))
		return
	}

	//固定每人只能上架10件物品
	count, err := h.Ds.GameService().GetCommodityCount(h.sendId)
	if count > 10 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 您上架的物品已上限"))
		return
	}

	//先上架成功物品到商店
	co := models.Commodity{
		Owner:  b.HolderID,
		Name:   b.Name,
		PropId: b.PropId,
		Count:  num,
		Price:  b.Price,
	}

	err = h.Ds.Common().Create(&co)
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
		return
	}

	//背包减掉相应物品
	b.Count -= num
	if b.Count < 1 {
		//删除
		h.Ds.GameService().DeleteBackpack(b)
	} else {
		//修改
		h.Ds.GameService().UpdateBackpack(&b)
	}
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 上架成功"))
}

func Buy(h *WsHandler, text string) {
	// 拆分格式
	textSp := strings.Split(text, " ")
	if len(textSp) < 2 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 格式错误 , 商店上架物品的格式为 [上架 物品 数量]"))
		return
	}
	var num int64 = 1
	//检查数量是否是对的格式
	if len(textSp) == 3 {
		num, _ = strconv.ParseInt(textSp[2], 10, 64)
	}

	if num < 1 {
		num = 1
	}

	//读取玩家的钱
	integrate := ReadIntegrateById(h, h.sendId)
	if integrate.Score == 0 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你身上没有一分钱"))
		return
	}
	//检查当前商城是否含有该物品
	commodities, err := h.Ds.GameService().GetCommoditiesByName(textSp[1])
	if len(commodities) == 0 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 商品不存在"))
		return
	}
	//读取该物品价格
	price := commodities[0].Price * num
	if integrate.Score < price {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你不够钱购买这些物品"))
		return
	}
	for _, v := range commodities {
		if num >= v.Count {
			if num == 0 || v.Count == 0 {
				return
			}
			//删除库存
			err = h.Ds.Common().Delete(models.Commodity{Base: models.Base{
				ID: v.ID,
			}})
			//增加玩家库存
			_, _, err = h.Ds.GameService().AddBack(h.sendId, v.PropId, v.Count)
			if err != nil {
				return
			}
			//转钱给卖家
			err = h.Ds.GameService().UpdateIntegrateScoreById(h.sendId, -price)
			err = h.Ds.GameService().UpdateIntegrateScoreById(v.Owner, int64(float64(price)*0.7))
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 购买成功 , %v*%v", v.Name, v.Count))
			num = num - v.Count
		} else if num < v.Count { //购买物品少于库存物品
			//减去商店库存
			v.Count = v.Count - num
			err = h.Ds.Common().Update(nil, &v)
			//增加玩家库存
			_, _, err = h.Ds.GameService().AddBack(h.sendId, v.PropId, num)
			if err != nil {
				return
			}
			fmt.Println(int64(float64(v.Price) * 0.7))
			err = h.Ds.GameService().UpdateIntegrateScoreById(h.sendId, -price)
			err = h.Ds.GameService().UpdateIntegrateScoreById(v.Owner, int64(float64(price)*0.7))
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 购买成功 , %v*%v", v.Name, num))
			return
		}
	}
}

//下架 旧报纸 1

func SoldOut(h *WsHandler, text string) {
	// 拆分格式
	textSp := strings.Split(text, " ")
	if len(textSp) < 2 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 格式错误 , 商店上架物品的格式为 [上架 物品 数量]"))
		return
	}
	var num int64 = 1
	//检查数量是否是对的格式
	if len(textSp) == 3 {
		num, _ = strconv.ParseInt(textSp[2], 10, 64)
	}

	if num < 1 {
		num = 1
	}

	//查询玩家是否在商店有出售这个物品
	b := models.Commodity{
		Owner: h.sendId,
		Name:  textSp[1],
	}

	commodities, err := h.Ds.GameService().GetAllCommodities(b)
	//没有这个物品的

	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
		return
	}

	if len(commodities) == 0 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你没有在商店上架此物品"))
		return
	}

	for _, v := range commodities {
		//要下架的物品数量
		if num >= v.Count {
			if num == 0 || v.Count == 0 {
				return
			}
			//删除库存
			err = h.Ds.Common().Delete(models.Commodity{Base: models.Base{
				ID: v.ID,
			}})
			//增加玩家库存
			_, _, err = h.Ds.GameService().AddBack(h.sendId, v.PropId, v.Count)
			if err != nil {
				return
			}
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 下架成功 , %v*%v", v.Name, v.Count))
			num = num - v.Count
		} else {
			//减去商店库存
			v.Count = v.Count - num
			err = h.Ds.Common().Update(nil, &v)
			//增加玩家库存
			_, _, err = h.Ds.GameService().AddBack(h.sendId, v.PropId, num)
			if err != nil {
				return
			}
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 下架成功 , %v*%v", v.Name, num))
			return
		}
	}

}
