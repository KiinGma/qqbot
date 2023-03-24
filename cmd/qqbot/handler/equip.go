package handler

import (
	"fmt"
	"qqbot/cmd/qqbot/models"
	"strings"
)

//卸下装备

func DownEquip(h *WsHandler, text string) {
	textSp := strings.Split(text, " ")
	name := textSp[1]

	//获取玩家装备信息
	equip := models.Equip{}
	err := h.Ds.Common().GetByID(h.sendId, &equip)

	//查询这个物品是否装在哪个位置
	id, err := equip.GetEquipPart(name)
	if err != nil || id == 0 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你没有装备这件物品"))
		return
	}
	//获取玩家总属性信息
	att := models.BasicAttributes{}
	err = h.Ds.Common().GetByID(h.sendId, &att)

	//获取这个装备的属性
	prop := models.Prop{}
	err = h.Ds.Common().GetByIDs(map[string]any{"prop_id": id}, &prop)
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
		return
	}

	//扣除这个物品的属性
	att.DeductBySuit(prop.Attributes)

	//查询当前装备的套装属性
	if equip.SuitId != 0 {
		suit := models.Suit{}
		err = h.Ds.Common().GetByID(h.sendId, &suit)
		if err != nil {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
			return
		}
		//扣除套装属性信息
		att.DeductBySuit(suit.Attributes)
		equip.SuitId = 0
		//重新计算套装加成
		m := equip.GetSuitMap()
		newSuit, err := h.Ds.GameService().GetSuitBy(m)
		if err != nil {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
			return
		}
		att.AddBySuit(newSuit.Attributes)
	}

	//更新属性表
	h.Ds.Common().Update(nil, &att)
	//更新装备栏表

	h.Ds.Common().Update(nil, &equip)
	//返还给玩家背包
	_, _, err = h.Ds.GameService().AddBack(h.sendId, id, 1)
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
		return
	}

	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 装备已卸下"))

}

//装上装备

func UpEquip(h *WsHandler, text string) {
	textSp := strings.Split(text, " ")
	name := textSp[1]
	//获取玩家背包装备
	backpack := models.Backpack{
		HolderID: h.sendId,
		Prop: models.Prop{
			Name: name,
		},
	}
	err := h.Ds.GameService().GetBackpack(&backpack)
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你的背包没有这个物品"))
		return
	}

	//获取玩家总属性信息
	att := models.BasicAttributes{}
	err = h.Ds.Common().GetByID(h.sendId, &att)

	//查询当前装备
	equip := models.Equip{
		Id: h.sendId,
	}
	err = h.Ds.Common().GetByID(h.sendId, &equip)

	//查询当前装备是否可以穿戴
	exchange, err := equip.Up(backpack)
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 该物品不可穿戴"))
		return
	}

	//查询当前装备的套装属性
	if equip.SuitId != 0 {
		suit := models.Suit{}
		err = h.Ds.Common().GetByID(h.sendId, &suit)
		if err != nil {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
			return
		}
		//扣除套装属性信息
		att.DeductBySuit(suit.Attributes)
		equip.SuitId = 0
		//重新计算套装加成
		m := equip.GetSuitMap()
		newSuit, err := h.Ds.GameService().GetSuitBy(m)
		if err != nil {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
			return
		}
		att.AddBySuit(newSuit.Attributes)
	}

	//查询该位置是否有装备
	if exchange != 0 {
		//查询这个被替换的装备
		prop := models.Prop{}
		err = h.Ds.Common().GetByIDs(map[string]any{
			"prop_id": exchange,
		}, &prop)
		att.DeductBySuit(prop.Attributes)
		//退回被替换的装备
		_, _, err = h.Ds.GameService().AddBack(h.sendId, exchange, 1)
		if err != nil {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
			return
		}
		//判断是否是同一件装备,不然下面更新不到
		if backpack.PropId == exchange {
			backpack.Count += 1
		}
	}

	//增加装备属性到人物属性中
	att.AddBySuit(backpack.Attributes)

	//减少一个库存
	if backpack.Count < 2 {
		h.Ds.Common().Delete(models.Backpack{
			HolderID: h.sendId,
			Prop: models.Prop{
				PropId: backpack.PropId,
			},
		})
	} else {
		backpack.Count -= 1
		err = h.Ds.GameService().UpdateBackpack(&backpack)
		if err != nil {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
			return
		}
	}

	//更新装备栏
	err = h.Ds.Common().Update(nil, &equip)
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
		return
	}

	//更新属性
	err = h.Ds.Common().Update(nil, &att)
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
		return
	}

	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 装备成功"))
}
