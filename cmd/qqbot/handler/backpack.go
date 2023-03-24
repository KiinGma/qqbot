package handler

import (
	"fmt"
	"gorm.io/gorm"
	"qqbot/cmd/qqbot/models"
	"qqbot/cmd/qqbot/repository"
	"strconv"
	"strings"
)

//获取人物背包

func GetPlayBackpack(h *WsHandler) {

	back := make([]models.Backpack, 0)
	f := repository.Filters{
		Filter: map[string]interface{}{
			"holder_id": h.sendId,
		},
	}
	h.Ds.Common().GetAllWithFilter(f, nil, &back)
	mcs := make([]models.MessageChain, 0)
	mcs = append(mcs, models.MessageChain{
		Type: "At", Target: h.sendId,
	})
	if len(back) != 0 {
		for _, v := range back {
			mc := models.MessageChain{
				Type: "Plain", Text: fmt.Sprintf(" \n[ %v * %v ]", v.Name, v.Count),
			}

			mcs = append(mcs, mc)
		}
	} else {
		mcs = append(mcs, models.MessageChain{
			Type: "Plain", Text: fmt.Sprintf(" \n\t空 "),
		})
	}

	h.client.SendGroupMessage(h.Gid, mcs)
}

// 丢弃背包物品

func DiscardBackpack(h *WsHandler, text string) {
	//正则匹配的,必然不会报错
	textSp := strings.Split(text, " ")
	var num int64 = 1
	//检查数量是否是对的格式
	if len(textSp) == 3 {
		num, _ = strconv.ParseInt(textSp[2], 10, 64)
		if num < 1 {
			num = 1
		}
	}
	//检查玩家背包是否有这些物品
	backpack := models.Backpack{
		HolderID: h.sendId,
		Prop: models.Prop{
			Name: textSp[1],
		},
	}
	err := h.Ds.GameService().GetBackpack(&backpack)
	if err != nil {
		return
	}
	if err == gorm.ErrRecordNotFound {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 物品不存在"))
		return
	}
	//减去数量
	backpack.Count = backpack.Count - num
	if backpack.Count <= 0 {
		//删除
		//新建删除字段
		err = h.Ds.Common().Delete(models.Backpack{
			HolderID: backpack.HolderID,
			Prop: models.Prop{
				PropId: backpack.PropId,
			},
		})
	} else {
		//修改
		err = h.Ds.GameService().UpdateBackpack(&backpack)

	}
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 服务器错误"))
		return
	}
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 丢弃成功"))
}
