package handler

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var WolfKillMap map[uint64]WolfKillStruct

type WolfKillStruct struct {
	//本次游戏的参与者
	Plays map[uint64]WolfKillPlay
	//本次游戏的所有牌数
	Cards []card
	//总积分
	Score int64
	//倍率
	Rate int64
	//游戏是否正在开始
	Start bool
	//游戏发起者
	Admin WolfKillPlay
}

type WolfKillPlay struct {
	id    uint64
	name  string
	role  string
	die   bool
	end   bool
	bid   bool
	score int
}

// WolfKill @一个个发言,如果没被@就发言,相当于棋牌
func (h *WsHandler) WolfKill() {
	for _, v := range h.resp.Data.MessageChain {
		switch {
		case v.Text == "i" || v.Text == "开始":
			InitGame(h)
		case v.Text == "1":
			WolfKillJoin(h)
		}
	}
}
func WolfKillStart(h *WsHandler, v string) {
	//发牌

}

// WolfKillDeal 分配角色
func WolfKillDeal(h *WsHandler) {
	//获取参与者信息

}

// WolfKillInit 游戏开始
func WolfKillInit(h *WsHandler, v string) {
	integrate := ReadIntegrateById(h, h.sendId)
	var rate int64 = 1
	results := regexp.MustCompile(`狼人杀\*[0-9]+`).FindAllString(v, -1)
	if len(results) != 0 {
		//开启多倍狼人杀
		ta := strings.Split(v, "*")
		rate, _ = strconv.ParseInt(ta[1], 10, 64)
	}
	if integrate.Score < rate {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("你的当前积分为: %v ,不足以开启游戏", integrate.Score))
		return
	}
	integrate.Score -= rate
	updateIntegrate(h, &integrate)
	//设置当前对话模式
	SessionTypeMap = map[uint64]int{
		h.Gid: 2,
	}
	WolfKillMap = make(map[uint64]WolfKillStruct)
	admin := WolfKillPlay{id: h.sendId, name: h.resp.Data.Sender.MemberName}
	WolfKillMap[h.Gid] = WolfKillStruct{
		Plays: map[uint64]WolfKillPlay{
			h.sendId: admin,
		},
		Admin: admin,
		Rate:  rate,
		Score: rate,
	}
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("狼人杀*%v游戏开始,请回复1参与\n游戏进行中会关闭其他功能", rate))
	//模式
	go func() {
		//1分钟未有人参与,2分钟未开始,则会取消游戏并返回积分
		time.Sleep(1 * time.Minute)
		if len(WolfKillMap[h.Gid].Plays) < 4 && !WolfKillMap[h.Gid].Start {
			h.client.SendGroupMessageWithString(h.Gid, 0, "当前游戏参与者不足,正在结束游戏")
			WolfKillDel(h)
			return
		}
		time.Sleep(2 * time.Minute)
		if !WolfKillMap[h.Gid].Start {
			h.client.SendGroupMessageWithString(h.Gid, 0, "当前游戏超时未开启,正在结束游戏")
			WolfKillDel(h)
			return
		}
	}()
}

// WolfKillJoin 游戏加入
func WolfKillJoin(h *WsHandler) {
	if WolfKillMap[h.Gid].Start {
		h.client.SendGroupMessageWithString(h.Gid, 0, "游戏已经开始,不能加入")
		return
	}
	game := WolfKillMap[h.Gid]
	//检查是否在游戏中
	plays := WolfKillMap[h.Gid].Plays
	for _, v := range plays {
		if v.id == h.sendId {
			h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("请不要重复加入"))
			return
		}
	}
	//查看是否够积分参加本局游戏
	integrate := ReadIntegrateById(h, h.sendId)
	if integrate.Score < game.Rate {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("你的当前积分为: %v ,不足以开启游戏", integrate.Score))
		return
	}

	plays[h.sendId] = WolfKillPlay{
		id:   h.sendId,
		name: h.resp.Data.Sender.MemberName,
	}

	//扣分
	integrate.Score -= game.Rate
	updateIntegrate(h, &integrate)

	game.Score = WolfKillMap[h.Gid].Score + WolfKillMap[h.Gid].Rate
	WolfKillMap[h.Gid] = game

	//发送加入成功消息,并告知有多少人多少倍率
	playsStr := ""
	for _, v := range plays {
		playsStr += " [ " + v.name + " ] "
	}
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("狼人杀*%v 加入成功,当前游戏玩家有 : %v , 总积分为: %v ", WolfKillMap[h.Gid].Rate, playsStr, WolfKillMap[h.Gid].Score))
}

// 结束游戏

func WolfKillDel(h *WsHandler) {
	gid := h.resp.Data.Sender.Group.Id
	//退回积分
	for _, v := range WolfKillMap[gid].Plays {
		integrate := ReadIntegrateById(h, v.id)
		integrate.Score += WolfKillMap[gid].Rate
		updateIntegrate(h, &integrate)
	}
	delete(WolfKillMap, h.resp.Data.Sender.Group.Id)
	h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("当前游戏已结束"))
	SessionTypeMap[gid] = 0
}

var WolfKillCards = map[int][]string{
	4: {
		"村民", "狼人", "女巫", "预言家",
	},
	5: {
		"村民", "村民", "狼人", "女巫", "预言家",
	},
	6: {
		"村民", "村民", "狼人", "狼人", "女巫", "预言家",
	},
	7: {
		"村民", "村民", "村民", "狼人", "狼人", "女巫", "预言家",
	},
	8: {
		"村民", "村民", "村民", "狼人", "狼人", "女巫", "预言家", "猎人",
	},
	9: {
		"村民", "村民", "村民", "狼人", "狼人", "狼人", "女巫", "预言家", "猎人",
	},
	10: {
		"村民", "村民", "村民", "村民", "狼人", "狼人", "狼人", "女巫", "预言家", "猎人",
	},
	11: {
		"村民", "村民", "村民", "村民", "狼人", "狼人", "狼人", "女巫", "预言家", "猎人", "守卫",
	},
	12: {
		"村民", "村民", "村民", "村民", "狼人", "狼人", "狼人", "狼人", "女巫", "预言家", "猎人", "守卫",
	},
}
