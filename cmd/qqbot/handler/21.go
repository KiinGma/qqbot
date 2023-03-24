package handler

import (
	"fmt"
	"qqbot/cmd/qqbot/models"
	"strconv"
	"strings"
	"time"
)

//21点游戏

var Game21Map map[uint64]Game21Struct

type Game21Struct struct {
	//本次游戏的参与者
	Plays map[uint64]Game21Play
	//本次游戏的所有牌数
	Cards map[int]string
	//总积分
	Score int64
	//倍率
	Rate int64
	//游戏是否正在开始
	Start bool
	//游戏发起者
	Admin Game21Play
}

type Game21Play struct {
	id    uint64
	name  string
	cards []string
	die   bool
	//当前是否可以叫牌
	end   bool
	bid   bool
	score int
}

//var GroupCards map[string][]card

type card struct {
	//牌面
	name string
	//是否已经发牌
	dealt bool
}

// Game21 无庄21点,即所有玩家均为庄家
// 开局可设置赌注 , 模式为@robot 21点*2 即21点游戏,初始赌注的2倍
// 无庄模式,赢家可赢取赌注池的所有点数,如有平局,则赢家平分赌注
// 操作有, 加入,加牌,停牌

func (h *WsHandler) Game21() {
	for _, v := range h.resp.Data.MessageChain {
		switch {
		case strings.Index(v.Text, "21点") != -1:
			start(h, v)
		case v.Text == "1":
			join(h)
		case v.Text == "i" || v.Text == "I" || v.Text == "开始":
			InitGame(h)
		case v.Text == "c" || v.Text == "C" || v.Text == "叫牌":
			bidding(h)
		/*case v.Text == "w":
		winner(h)*/
		case v.Text == "o" || v.Text == "O" || v.Text == "取消":
			del(h)
		case v.Text == "介绍":
			h.Game21Explain()
		case v.Text == "s" || v.Text == "S" || v.Text == "停牌":
			ending(h)
		case v.Text == "结束":
			if h.sendId == 764647954 || h.resp.Data.Sender.Permission == "OWNER" {
				del(h)
			}
		}
	}
}

// Game21Explain 游戏介绍
func (h *WsHandler) Game21Explain() {
	gid := h.resp.Data.Sender.Group.Id
	sid := h.resp.Data.Sender.Id
	h.client.SendGroupMessageWithString(gid, sid, fmt.Sprintf("21点无庄模式玩法:\n游戏默认倍率为1分,可根据积分开启多倍率模式,格式为\"21点*100\",解释为开启100倍积分模式\n参与者需要拥有相应倍率的积分\n积分池取决于参与者的数量*倍数,赢家可赢取全部积分,多位赢家则评分积分池\n"))
	return
}

// 结束游戏

func del(h *WsHandler) {
	gid := h.resp.Data.Sender.Group.Id
	//退回积分
	for _, v := range Game21Map[gid].Plays {
		integrate := ReadIntegrateById(h, v.id)
		integrate.Score += Game21Map[gid].Rate
		updateIntegrate(h, &integrate)
	}
	delete(Game21Map, h.resp.Data.Sender.Group.Id)
	h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("当前游戏已结束"))
	SessionTypeMap[gid] = 0
}

func start(h *WsHandler, v models.MessageChain) {
	_, has := Game21Map[h.Gid]
	if has {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("当前群有21点游戏正在进行"))
		return
	}

	gid := h.resp.Data.Sender.Group.Id
	sid := h.resp.Data.Sender.Id
	name := h.resp.Data.Sender.MemberName

	integrate := ReadIntegrateById(h, sid)

	var rate int64 = 1
	var err error

	if strings.Index(v.Text, "21点*") != -1 {
		ta := strings.Split(v.Text, "*")
		if len(ta) == 2 {
			rate, err = strconv.ParseInt(ta[1], 10, 64)
			if err != nil {
				//错误输入
				h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("输入错误"))
				return
			}
		}
	}

	if integrate.Score < rate {
		h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("你的当前积分为: %v ,不足以开启游戏", integrate.Score))
		return
	}

	integrate.Score -= rate

	updateIntegrate(h, &integrate)

	SessionTypeMap = map[uint64]int{
		gid: 1,
	}

	Game21Map = make(map[uint64]Game21Struct)
	admin := Game21Play{id: sid, name: name}

	cards := map[int]string{
		0: "A",
		1: "A",
		2: "A",
		3: "A",

		4: "2",
		5: "2",
		6: "2",
		7: "2",

		8:  "3",
		9:  "3",
		10: "3",
		11: "3",

		12: "4",
		13: "4",
		14: "4",
		15: "4",

		16: "5",
		17: "5",
		18: "5",
		19: "5",

		20: "6",
		21: "6",
		22: "6",
		23: "6",

		24: "7",
		25: "7",
		26: "7",
		27: "7",

		28: "8",
		29: "8",
		30: "8",
		31: "8",

		32: "9",
		33: "9",
		34: "9",
		35: "9",

		36: "10",
		37: "10",
		38: "10",
		39: "10",

		40: "J",
		41: "J",
		42: "J",
		43: "J",

		44: "Q",
		45: "Q",
		46: "Q",
		47: "Q",

		48: "K",
		49: "K",
		50: "K",
		51: "K",
	}

	Game21Map[gid] = Game21Struct{
		Cards: cards,
		Plays: map[uint64]Game21Play{
			sid: admin,
		},
		Admin: admin,
		Rate:  rate,
		Score: rate,
	}

	h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("21点*%v游戏开始,请回复1参与\n指令提示:\n游戏需要发起人开始游戏,回复i或开始\n叫牌回复c或者叫牌\n停牌回复s或停牌\n游戏进行中会关闭其他功能", rate))
	//模式
	SessionTypeMap[gid] = 1

	go func() {
		time.Sleep(1 * time.Minute)
		if len(Game21Map[gid].Plays) == 1 && !Game21Map[gid].Start {
			h.client.SendGroupMessageWithString(gid, 0, "当前游戏没有参与者,正在结束游戏")
			del(h)
			return
		}
	}()

}

// 停牌
func ending(h *WsHandler) {
	gid := h.resp.Data.Sender.Group.Id
	if !Game21Map[gid].Start {
		h.client.SendGroupMessageWithString(gid, 0, "游戏还没开始,不能叫停牌")
		return
	}
	sid := h.resp.Data.Sender.Id
	v, has := Game21Map[gid].Plays[sid]
	if !has {
		h.client.SendGroupMessageWithString(gid, 0, "你没有参与这场对决")
		return
	}
	if v.die {
		h.client.SendGroupMessageWithString(gid, 0, "你寄了,不用停牌")
		return
	}
	v.end = true
	Game21Map[gid].Plays[sid] = v
	//检测是否还有其他玩家,有的话就等待
	for _, play := range Game21Map[gid].Plays {
		if !play.end {
			h.client.SendGroupMessageWithString(gid, sid, "停牌完毕,正在等待其他玩家")
			return
		}
	}
	winner(h)
}

// 叫牌
func bidding(h *WsHandler) {
	gid := h.resp.Data.Sender.Group.Id
	if !Game21Map[gid].Start {
		h.client.SendGroupMessageWithString(gid, 0, "游戏还没开始,不能叫牌")
		return
	}
	sid := h.resp.Data.Sender.Id
	v, has := Game21Map[gid].Plays[sid]
	if !has {
		h.client.SendGroupMessageWithString(gid, 0, "你没有参与这场对决")
		return
	}
	if v.die {
		h.client.SendGroupMessageWithString(gid, 0, "你寄了,不能叫牌")
		return
	}
	if v.end {
		h.client.SendGroupMessageWithString(gid, 0, "不是说好了不叫牌了吗")
		return
	}
	msc := make([]models.MessageChain, 0)
	//检查这个崽子现在能不能叫牌
	cards := v.cards
	cards = append(cards, deal(gid))
	v.cards = cards
	//立马发送牌数
	v.score = sum(v.cards)
	if v.score > 21 {
		msc = []models.MessageChain{{
			Type:   "At",
			Target: sid,
		}, {
			Type: "Plain",
			Text: fmt.Sprintf(" %v {%v爆}\n", v.cards, v.score),
		},
		}
		v.die = true
		v.end = true
		Game21Map[gid].Plays[sid] = v
		//检测是否还有其他玩家,有的话就等待
		for _, play := range Game21Map[gid].Plays {
			if !play.end {
				h.client.SendGroupMessage(gid, msc)
				return
			}
		}
		h.client.SendGroupMessage(gid, msc)
		winner(h)
	} else {
		msc = []models.MessageChain{{
			Type:   "At",
			Target: sid,
		}, {
			Type: "Plain",
			Text: fmt.Sprintf(" %v {%v点}\n", v.cards, v.score),
		},
		}
		Game21Map[gid].Plays[sid] = v
		h.client.SendGroupMessage(gid, msc)
	}

}

// 计算赢家并结算积分
func winner(h *WsHandler) {
	gid := h.resp.Data.Sender.Group.Id
	h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("正在计算结果"))
	//获取所有玩家
	plays := Game21Map[gid].Plays
	msc := make([]models.MessageChain, 0)
	wins := make([]Game21Play, 0)
	maxScore := 0
	//可能存在多个玩家一起赢
	for k, v := range plays {
		m := models.MessageChain{}
		v.score = sum(v.cards)
		if v.score > 21 {
			m = models.MessageChain{
				Type: "Plain",
				Text: fmt.Sprintf("%v: %v {爆}\n", v.name, v.cards),
			}
		} else {
			m = models.MessageChain{
				Type: "Plain",
				Text: fmt.Sprintf("%v: %v {%v点}\n", v.name, v.cards, v.score),
			}
			if v.score > maxScore {
				//获取到最高分
				maxScore = v.score
			}
		}
		msc = append(msc, m)
		plays[k] = v
	}

	//获取到最高分的人提取出来
	var winsStr string
	for _, v := range plays {
		if v.score == maxScore {
			wins = append(wins, v)
			winsStr += " [ " + v.name + " ] "
		}
	}
	//给每个胜利者加分
	for _, v := range wins {
		integrate := ReadIntegrateById(h, v.id)
		add := Game21Map[gid].Score / int64(len(wins))
		integrate.Score += add
		updateIntegrate(h, &integrate)
	}

	if len(wins) == 0 {
		winsStr = "[ 没有赢家,积分不返还 ]"
	}

	msc = append(msc, models.MessageChain{
		Type: "Plain", Text: fmt.Sprintf("\n优胜者: %v", winsStr),
	})
	h.client.SendGroupMessage(gid, msc)
	//清除数据
	delete(Game21Map, gid)
	SessionTypeMap[gid] = 0
}

// InitGame 初始化发牌
func InitGame(h *WsHandler) {
	gid := h.resp.Data.Sender.Group.Id
	sid := h.resp.Data.Sender.Id
	if sid != Game21Map[gid].Admin.id {
		h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("你不是游戏发起者,不能开启游戏"))
		return
	}
	//给每个玩家发两张牌
	if Game21Map[gid].Start {
		h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("不要重复开启游戏"))
		return
	}
	h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("发放底牌中..."))
	game21Map := Game21Map[gid]
	game21Map.Start = true
	Game21Map[gid] = game21Map
	plays := Game21Map[gid].Plays
	msc := make([]models.MessageChain, 0)
	for k, v := range plays {
		v.cards = []string{
			deal(gid),
			deal(gid),
		}
		plays[k] = v
		m := models.MessageChain{}
		s := sum(v.cards)
		if s > 21 {
			m = models.MessageChain{
				Type: "Plain",
				Text: fmt.Sprintf("%v: %v {爆}\n", v.name, v.cards),
			}
		} else {
			m = models.MessageChain{
				Type: "Plain",
				Text: fmt.Sprintf("%v: %v {%v点}\n", v.name, v.cards, s),
			}
		}
		msc = append(msc, m)
	}

	h.client.SendGroupMessage(gid, msc)
}

// 加入玩家
func join(h *WsHandler) {
	gid := h.resp.Data.Sender.Group.Id
	sid := h.resp.Data.Sender.Id
	if Game21Map[gid].Start {
		h.client.SendGroupMessageWithString(gid, 0, "游戏已经开始,不能加入")
		return
	}
	game := Game21Map[gid]
	//检查是否在游戏中
	plays := Game21Map[gid].Plays
	for _, v := range plays {
		if v.id == sid {
			h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("请不要重复加入"))
			return
		}
	}
	//查看是否够积分参加本局游戏
	integrate := ReadIntegrateById(h, sid)
	if integrate.Score < game.Rate {
		h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("你的当前积分为: %v ,不足以加入游戏", integrate.Score))
		return
	}

	plays[sid] = Game21Play{
		id:   sid,
		name: h.resp.Data.Sender.MemberName,
	}

	//扣分
	integrate.Score -= game.Rate
	updateIntegrate(h, &integrate)

	game.Score = Game21Map[gid].Score + Game21Map[gid].Rate
	Game21Map[gid] = game

	//发送加入成功消息,并告知有多少人多少倍率
	playsStr := ""
	for _, v := range plays {
		playsStr += " [ " + v.name + " ] "
	}
	h.client.SendGroupMessageWithString(gid, 0, fmt.Sprintf("21点*%v 加入成功,当前游戏玩家有 : %v , 总积分为: %v ", Game21Map[gid].Rate, playsStr, Game21Map[gid].Score))
}

// deal 发牌动作
func deal(key uint64) string {
	game := Game21Map[key]
	cards := game.Cards
	for k, v := range cards {
		delete(cards, k)
		game.Cards = cards
		Game21Map[key] = game
		return v
	}
	return "没牌了"
}

// 计算点数

func sum(cars []string) int {
	s := 0
	ATimes := 0
	for _, v := range cars {
		switch v {
		case "A":
			ATimes++
		case "2":
			s += 2
		case "3":
			s += 3
		case "4":
			s += 4
		case "5":
			s += 5
		case "6":
			s += 6
		case "7":
			s += 7
		case "8":
			s += 8
		case "9":
			s += 9
		case "10":
			s += 10
		case "J":
			s += 10
		case "Q":
			s += 10
		case "K":
			s += 10
		}
	}
	a := 0
	//1A情况
	if ATimes == 1 {
		if s+11 > 21 {
			a += 1
		} else {
			a += 11
		}
	} else if ATimes == 2 {
		//2A情况
		//2,12,22
		if s+12 <= 21 {
			a = 12
		} else {
			a = 2
		}
	} else if ATimes == 3 {
		//3A情况
		//1+1+1 1+11+1
		if s+13 <= 21 {
			a = 13
		} else {
			a = 3
		}
	} else if ATimes == 4 {
		if s+14 <= 21 {
			a = 14
		} else {
			a = 4
		}
	}
	s += a
	return s
}
