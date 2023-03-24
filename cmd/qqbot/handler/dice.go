package handler

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var DiceGameMap map[uint64]DiceGameStruct

type DiceGameStruct struct {
	//本次游戏的参与者
	Plays map[uint64]DiceGamePlay
	//总积分
	Score int64
	//最大积分
	MaxScore int64
	//场内全输的积分综合
	SumScore int64

	//游戏是否正在开始
	Start int
	//游戏发起者
	Admin DiceGamePlay
}

type DiceGamePlay struct {
	id    uint64
	name  string
	score int64
	//押注
	bet []map[string]int64
}

//骰子

func (h *WsHandler) Dice() {
	for _, v := range h.resp.Data.MessageChain {
		switch {
		case regexp.MustCompile(`^正[0-9]+\*[0-9]+$|^正[0-9]+$`).MatchString(v.Text):
			AnteJust(h, v.Text)
		case regexp.MustCompile(`^单\*[0-9]+$|^单$`).MatchString(v.Text):
			AnteSingle(h, v.Text)
		case regexp.MustCompile(`^双\*[0-9]+$|^双$`).MatchString(v.Text):
			AnteEven(h, v.Text)
		case regexp.MustCompile(`^大\*[0-9]+$|^大$`).MatchString(v.Text):
			AnteBig(h, v.Text)
		case regexp.MustCompile(`^小\*[0-9]+$|^小$`).MatchString(v.Text):
			AnteLittle(h, v.Text)
		case v.Text == "i" || v.Text == "开始" || v.Text == "开" || v.Text == "I":
			DiceGameStart(h)
		case v.Text == "结束":
			DiceGameStop(h)
		}
	}
}

//游戏终止

func DiceGameStop(h *WsHandler) {
	if h.sendId != 764647954 && h.resp.Data.Sender.Permission != "OWNER" {
		return
	}
	//返还积分
	for _, v := range DiceGameMap[h.Gid].Plays {
		playI := ReadIntegrateById(h, v.id)
		for _, v1 := range v.bet {
			for _, v2 := range v1 {
				playI.Score += v2
			}
		}
		updateIntegrate(h, &playI)
	}
	delete(DiceGameMap, h.Gid)
	delete(SessionTypeMap, h.Gid)
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("游戏结束 , 积分已返还"))
}

//游戏初始化

func InitDiceGame(h *WsHandler) {
	//检查游戏是否已开启
	_, has := DiceGameMap[h.Gid]
	if has {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("当前群有游戏正在进行"))
		return
	}
	//检查房主是否够50分开庄
	sendI := ReadIntegrateById(h, h.sendId)
	if sendI.Score < 50 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf("你的余额不足50 , 不能成为房主"))
		return
	}
	//初始化游戏
	DiceGameMap = map[uint64]DiceGameStruct{
		h.Gid: {
			Start:    1,
			Score:    0,
			MaxScore: sendI.Score,
			Plays:    map[uint64]DiceGamePlay{},
			Admin: DiceGamePlay{
				id:   h.sendId,
				name: h.resp.Data.Sender.MemberName,
			},
		},
	}
	SessionTypeMap = map[uint64]int{
		h.Gid: 5,
	}
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("幸运骰子游戏开始\n\n指令提示:\n\n游戏需要发起人开始游戏,回复i或开始\n\n押注类别有 [单] [双] [大] [小] [正]\n\n押注格式为 [单*10] 或 [单] 表示为押 单 注 10积分\n\n正注压法为 [正12] 或 [正12*10] ,表示为 押 正12点 10积分\n\n正注倍率为 5 , 其他押注倍率为 2\n\n押注超过房主持有积分将不能再下单\n\n游戏进行中会关闭其他功能"))
}

//玩家下单 - 单

func AnteSingle(h *WsHandler, text string) {
	game, _ := DiceGameMap[h.Gid]
	if game.Admin.id == h.sendId {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf("你是房主 , 不可以对自己下单"))
		return
	}
	var money int64
	if text == "单" {
		money = 1
	} else {
		money, _ = strconv.ParseInt(strings.Split(text, "*")[1], 10, 64)
	}

	//读取余额
	sendI := ReadIntegrateById(h, h.sendId)
	if sendI.Score < money {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("下单失败 , 余额不足"))
		return
	}

	//不能 超出房主余额
	if money*2+game.SumScore > game.MaxScore {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 超出房主余额 ! 房主剩余余额为 %v", game.MaxScore-game.SumScore))
		return
	}

	sendI.Score -= money
	game.SumScore += money * 2
	game.Score += money

	//多次下单情况
	play, has := game.Plays[h.sendId]
	if has {
		play.bet = append(play.bet, map[string]int64{
			"单": money,
		})
		game.Plays[h.sendId] = play
	} else {
		play = DiceGamePlay{
			id:   h.sendId,
			name: h.resp.Data.Sender.MemberName,
		}
		play.bet = make([]map[string]int64, 1)
		play.bet[0] = map[string]int64{
			"单": money,
		}
		game.Plays[h.sendId] = play
	}
	DiceGameMap[h.Gid] = game
	updateIntegrate(h, &sendI)
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 下单成功"))
}

//玩家下单 - 双

func AnteEven(h *WsHandler, text string) {
	game, _ := DiceGameMap[h.Gid]
	if game.Admin.id == h.sendId {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf("你是房主 , 不可以对自己下单"))
		return
	}
	var money int64
	if text == "双" {
		money = 1
	} else {
		money, _ = strconv.ParseInt(strings.Split(text, "*")[1], 10, 64)
	}

	//读取余额
	sendI := ReadIntegrateById(h, h.sendId)
	if sendI.Score < money {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("下单失败 , 余额不足"))
		return
	}

	//不能 超出房主余额
	if money*2+game.SumScore > game.MaxScore {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 超出房主余额 ! 房主剩余余额为 %v", game.MaxScore-game.SumScore))
		return
	}
	sendI.Score -= money
	game.SumScore += money * 2
	game.Score += money

	//多次下单情况
	play, has := game.Plays[h.sendId]
	if has {
		play.bet = append(play.bet, map[string]int64{
			"双": money,
		})
		game.Plays[h.sendId] = play
	} else {
		play = DiceGamePlay{
			id:   h.sendId,
			name: h.resp.Data.Sender.MemberName,
		}
		play.bet = make([]map[string]int64, 1)
		play.bet[0] = map[string]int64{
			"双": money,
		}
		game.Plays[h.sendId] = play
	}
	DiceGameMap[h.Gid] = game
	updateIntegrate(h, &sendI)
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 下单成功"))
}

//玩家下单 - 大

func AnteBig(h *WsHandler, text string) {
	game, _ := DiceGameMap[h.Gid]
	if game.Admin.id == h.sendId {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf("你是房主 , 不可以对自己下单"))
		return
	}
	var money int64
	if text == "大" {
		money = 1
	} else {
		money, _ = strconv.ParseInt(strings.Split(text, "*")[1], 10, 64)
	}
	//读取余额
	sendI := ReadIntegrateById(h, h.sendId)
	if sendI.Score < money {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("下单失败 , 余额不足"))
		return
	}

	//不能 超出房主余额
	if money*2+game.SumScore > game.MaxScore {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 超出房主余额 ! 房主剩余余额为 %v", game.MaxScore-game.SumScore))
		return
	}
	sendI.Score -= money
	game.SumScore += money * 2
	game.Score += money

	//多次下单情况
	play, has := game.Plays[h.sendId]
	if has {
		play.bet = append(play.bet, map[string]int64{
			"大": money,
		})
		game.Plays[h.sendId] = play
	} else {
		play = DiceGamePlay{
			id:   h.sendId,
			name: h.resp.Data.Sender.MemberName,
		}
		play.bet = make([]map[string]int64, 1)

		play.bet[0] = map[string]int64{
			"大": money,
		}
		game.Plays[h.sendId] = play
	}
	DiceGameMap[h.Gid] = game
	updateIntegrate(h, &sendI)
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 下单成功"))
}

//玩家下单 - 小

func AnteLittle(h *WsHandler, text string) {
	game, _ := DiceGameMap[h.Gid]
	if game.Admin.id == h.sendId {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf("你是房主 , 不可以对自己下单"))
		return
	}
	var money int64
	if text == "小" {
		money = 1
	} else {
		money, _ = strconv.ParseInt(strings.Split(text, "*")[1], 10, 64)
	}
	//读取余额
	sendI := ReadIntegrateById(h, h.sendId)
	if sendI.Score < money {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("下单失败 , 余额不足"))
		return
	}

	//不能 超出房主余额
	if money*2+game.SumScore > game.MaxScore {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 超出房主余额 ! 房主剩余余额为 %v", game.MaxScore-game.SumScore))
		return
	}

	sendI.Score -= money
	game.SumScore += money * 2
	game.Score += money
	//多次下单情况
	play, has := game.Plays[h.sendId]
	if has {
		play.bet = append(play.bet, map[string]int64{
			"小": money,
		})
		game.Plays[h.sendId] = play
	} else {
		play = DiceGamePlay{
			id:   h.sendId,
			name: h.resp.Data.Sender.MemberName,
		}
		play.bet = make([]map[string]int64, 1)
		play.bet[0] = map[string]int64{
			"小": money,
		}
		game.Plays[h.sendId] = play
	}
	DiceGameMap[h.Gid] = game
	updateIntegrate(h, &sendI)
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 下单成功"))
}

//玩家下单 - 正

func AnteJust(h *WsHandler, text string) {
	game, _ := DiceGameMap[h.Gid]
	if game.Admin.id == h.sendId {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你是房主 , 不可以对自己下单"))
		return
	}
	var money int64

	textS := strings.Split(text, "*")
	num := strings.ReplaceAll(textS[0], "正", "")

	//TODO 点数不能超过18

	//压点数
	if len(textS) == 1 {
		money = 1
	} else {
		money, _ = strconv.ParseInt(textS[1], 10, 64)
	}

	//不能 超出房主余额
	if money*5+game.SumScore > game.MaxScore {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 超出房主余额 ! 房主剩余余额为 %v", game.MaxScore-game.SumScore))
		return
	}

	//读取余额
	sendI := ReadIntegrateById(h, h.sendId)
	if sendI.Score < money {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 下单失败 , 余额不足"))
		return
	}
	sendI.Score -= money
	game.SumScore += money * 5
	game.Score += money

	//多次下单情况
	play, has := game.Plays[h.sendId]
	if has {
		play.bet = append(play.bet, map[string]int64{
			num: money,
		})
		game.Plays[h.sendId] = play
	} else {
		play = DiceGamePlay{
			id:   h.sendId,
			name: h.resp.Data.Sender.MemberName,
		}
		play.bet = make([]map[string]int64, 1)
		play.bet[0] = map[string]int64{
			num: money,
		}
		game.Plays[h.sendId] = play
	}
	DiceGameMap[h.Gid] = game
	updateIntegrate(h, &sendI)
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 下单成功"))
}

//开始游戏

func DiceGameStart(h *WsHandler) {
	if h.sendId != DiceGameMap[h.Gid].Admin.id {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你不是游戏房主,不能开启游戏"))
		return
	}
	value1, _ := rand.Int(rand.Reader, big.NewInt(600000))
	h.client.SendDice(h.Gid, h.sendId, value1.Int64()/100000+1)
	time.Sleep(2 * time.Second)
	value2, _ := rand.Int(rand.Reader, big.NewInt(600000))
	h.client.SendDice(h.Gid, h.sendId, value2.Int64()/100000+1)
	time.Sleep(2 * time.Second)
	value3, _ := rand.Int(rand.Reader, big.NewInt(600000))
	h.client.SendDice(h.Gid, h.sendId, value3.Int64()/100000+1)
	time.Sleep(2 * time.Second)
	sum := value1.Int64()/100000 + value2.Int64()/100000 + value3.Int64()/100000 + 3
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 总点数: %v ", sum))
	if value1.Int64()/100000 == value2.Int64()/100000 && value2.Int64()/100000 == value3.Int64()/100000 {
		DiceGameAdminWinner(h)
	} else {
		DiceGameWinner(h, sum)
	}
	delete(DiceGameMap, h.Gid)
	delete(SessionTypeMap, h.Gid)
}

// DiceGameAdminWinner 同色庄家赢
func DiceGameAdminWinner(h *WsHandler) {
	game := DiceGameMap[h.Gid]
	admin := ReadIntegrateById(h, DiceGameMap[h.Gid].Admin.id)
	admin.Score = admin.Score + game.Score
	updateIntegrate(h, &admin)
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("游戏结束... 房主获得 %v 分", game.Score))

}

func DiceGameWinner(h *WsHandler, value int64) {
	game := DiceGameMap[h.Gid]
	//遍历所有的玩家
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("正在结算 ... "))
	var sumScore int64 = 0
	for _, v := range game.Plays {
		playI := ReadIntegrateById(h, v.id)
		for _, v1 := range v.bet {
			for k2, v2 := range v1 {
				s := v2 * DiceGameAddScore(k2, value)
				playI.Score += s
				if s > 0 {
					sumScore += s
					h.client.SendGroupMessageWithString(h.Gid, v.id, fmt.Sprintf(" 注 ( %v ) 积分 +%v", k2, s))
				}
			}
		}
		updateIntegrate(h, &playI)
	}

	//房主加减分
	admin := ReadIntegrateById(h, DiceGameMap[h.Gid].Admin.id)
	admin.Score = admin.Score + game.Score - sumScore
	updateIntegrate(h, &admin)
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("游戏结束... 房主获得 %v 分", game.Score-sumScore))
}

func DiceGameAddScore(bet string, value int64) int64 {
	//计算单双
	oe := false
	if value%2 == 0 {
		oe = true
	}

	//计算大小
	isBig := false
	if value > 11 {
		isBig = true
	}

	switch bet {
	case "单":
		if !oe {
			return 2
		}
	case "双":
		if oe {
			return 2
		}
	case "大":
		if isBig {
			return 2
		}
	case "小":
		if !isBig {
			return 2
		}
	case strconv.FormatInt(value, 10):
		return 5
	}
	return 0
}
