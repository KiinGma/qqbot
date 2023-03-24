package handler

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"qqbot/cmd/qqbot/models"
	"regexp"
	"strconv"
	"strings"
	"time"
)

/// GuessNumbersGame

var GuessNumbersGameMap map[uint64]GuessNumbersGameStruct

type GuessNumbersGameStruct struct {
	//记录发言时间
	sendTimeMap map[uint64]time.Time
	//总积分
	Score int64
	//倍率
	Rate int64
	//游戏是否正在开始
	Start int
	//数字
	Number int64
	//游戏发起者
	Admin GuessNumbersGamePlay
}

type GuessNumbersGamePlay struct {
	id    uint64
	name  string
	role  string
	die   bool
	end   bool
	bid   bool
	score int
}

// GuessNumbersGame @一个个发言,如果没被@就发言,相当于棋牌
func (h *WsHandler) GuessNumbersGame() {
	for _, v := range h.resp.Data.MessageChain {
		switch {
		case regexp.MustCompile(`^[0-9]+$`).MatchString(v.Text):
			GuessNumber(h, v.Text)
		case v.Text == "奖池":
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 当前游戏奖池积分为: %v", GuessNumbersGameMap[h.Gid].Score))
		case v.Text == "结束":
			if h.sendId == 764647954 || h.resp.Data.Sender.Permission == "OWNER" {
				_, has := GuessNumbersGameMap[h.Gid]
				if has {
					delete(SessionTypeMap, h.Gid)
					delete(GuessNumbersGameMap, h.Gid)
					h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 游戏结束"))
				} else {
					h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 没有游戏在进行"))
				}
			} else {
				h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你不是管理员,不能结束游戏"))
			}

		}
	}
}

// GuessNumbersGameInit 猜数字*100
func GuessNumbersGameInit(h *WsHandler, text string) {
	//检查是否有游戏开启
	_, has := GuessNumbersGameMap[h.Gid]
	if has {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("当前群有猜数字游戏正在进行"))
		return
	}
	//获取开启猜数字范围
	var scope int64 = 100
	if regexp.MustCompile(`^猜数字\*[0-9]+$`).MatchString(text) {
		ta := strings.Split(text, "*")
		if len(ta) == 2 {
			scope, _ = strconv.ParseInt(ta[1], 10, 64)
			if scope > 10000000000 {
				scope = 10000000000
			} else if scope < 10 {
				scope = 10
			}
		}
	}
	//从范围内获取一个数字
L:
	result, _ := rand.Int(rand.Reader, big.NewInt(scope))
	if result.Int64() == 0 {
		goto L
	}
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("猜数字游戏开始,请从 (1 - %v) 选择一个数字,答错扣 1 分", scope))
	//创建游戏
	GuessNumbersGameMap = map[uint64]GuessNumbersGameStruct{
		h.Gid: {
			Score:  0,
			Number: result.Int64(),
			Start:  1,
			Admin: GuessNumbersGamePlay{
				id: h.sendId,
			},
		},
	}

	//标记游戏开始类型
	SessionTypeMap = map[uint64]int{
		h.Gid: 4,
	}
}

//猜数字的动作

func GuessNumber(h *WsHandler, text string) {
	//先查询个人有没有1点积分
	sendIntegrate := ReadIntegrateById(h, h.sendId)
	if sendIntegrate.Score < 1 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 您已经没钱了,本次猜数字无效")
		return
	}
	//限制发言时间
	game := GuessNumbersGameMap[h.Gid]
	sendTimeMap, has := game.sendTimeMap[h.sendId]
	if has {
		if time.Now().Unix()-sendTimeMap.Unix() < 3 {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 连续发言不能超过3s")
			return
		}
	}
	game.sendTimeMap = map[uint64]time.Time{
		h.sendId: time.Now(),
	}

	num, _ := strconv.ParseInt(text, 10, 64)
	switch {
	case num == GuessNumbersGameMap[h.Gid].Number:
		sendIntegrate.Score += game.Score
		updateIntegrate(h, &sendIntegrate)
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 恭喜您 , 猜对了 ! 积分 +%v , 游戏结束", game.Score))
		delete(SessionTypeMap, h.Gid)
		delete(GuessNumbersGameMap, h.Gid)
		return
	case num < GuessNumbersGameMap[h.Gid].Number:
		GuessNumbersGameLost(h, sendIntegrate)
		game.Score += 1
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, GetRandomMap(greaterRandomMap))
	case num > GuessNumbersGameMap[h.Gid].Number:
		GuessNumbersGameLost(h, sendIntegrate)
		game.Score += 1
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, GetRandomMap(lessRandomMap))
	}

	GuessNumbersGameMap[h.Gid] = game
}

// GuessNumbersGameLost 扣1分动作
func GuessNumbersGameLost(h *WsHandler, sendIntegrate models.Integrate) {
	sendIntegrate.Score -= 1
	updateIntegrate(h, &sendIntegrate)
}

var greaterRandomMap = map[int]string{
	1:  " 你猜小了 , 积分 -1 ",
	2:  " 猜错了 , 正确的数字可能更大些,积分 -1 ",
	3:  " 猜错了 , 可能更大一些 , 积分 -1 ",
	4:  " 还要更大一些 , 积分 -1 ",
	5:  " 小了 , 积分 -1 ",
	6:  " 要中了 , 还差一点 , 积分 -1 ",
	7:  " 胜利就在眼前 , 积分 -1 ",
	8:  " 猜错了, 要不试试更大的数字吧 , 积分 -1 ",
	9:  " 还差太远了, 大胆点 , 想些更大的 , 积分 -1 ",
	10: " 脑瓜嗡嗡的, 你感觉需要更大的数字 , 积分 -1 ",
	11: " 或许你需要缓一缓 , 脑袋都宕机了 , 积分 -1 ",
}

var lessRandomMap = map[int]string{
	1:  " 你猜大了 , 积分-1",
	2:  " 猜错了 , 正确的数字可能更小些 , 积分 -1",
	3:  " 猜错了 , 可能更小一些 , 积分 -1",
	4:  " 还要更小一些 , 积分 -1 ",
	5:  " 大了 , 积分 -1 ",
	6:  " 要中了 , 还差一点 , 积分 -1 ",
	7:  " 胜利就在眼前 , 积分 -1 ",
	8:  " 猜错了, 要不试试更小的数字吧 , 积分 -1 ",
	9:  " 还差太远了, 大胆点 , 想些更小的 , 积分 -1 ",
	10: " 脑瓜嗡嗡的, 你感觉需要更小的数字 , 积分 -1 ",
	11: " 或许你需要缓一缓 , 脑袋都宕机了 , 积分 -1 ",
}

func GetRandomMap(m map[int]string) string {
	for _, v := range m {
		return v
	}
	return ""
}
