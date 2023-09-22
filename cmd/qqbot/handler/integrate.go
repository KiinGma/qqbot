package handler

import (
	"crypto/rand"
	"fmt"
	"gorm.io/gorm"
	"kiingma/cmd/qqbot/models"
	"kiingma/cmd/qqbot/repository"
	"kiingma/pkg/image_pkg"
	"math/big"
	"regexp"
	"strconv"
	"strings"
	"time"
)

func (h *WsHandler) Integrate(groupId, senderId uint64, msg string) {
	//去空格
	msg = strings.ReplaceAll(msg, " ", "")
	switch {
	case msg == "查询积分" || msg == "积分":
		h.client.SendGroupMessageWithString(groupId, senderId, ` 您当前的积分为: `+strconv.FormatInt(ReadIntegrateById(h, senderId).Score, 10))
	case msg == "求签":
		lots(h)
	case msg == "积分榜":
		Top5(h)
	case msg == "停止要饭":
		noBeg(h)
	case msg == "要饭":
		beg(h)
	case msg == "签到":
		signed(h, groupId, senderId)
	}
}

// Transfer 积分转账
func Transfer(h *WsHandler, resp models.RespMessage) {
	if len(resp.Data.MessageChain) != 4 {
		return
	}
	//获取转账额度
	accountStr := strings.ReplaceAll(resp.Data.MessageChain[3].Text, " ", "")

	account, err := strconv.ParseInt(accountStr, 10, 64)
	if err != nil || account < 1 {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("转账失败,请输入大于0的正整数"))
		return
	}
	//检查转账人账户
	sendIntegrate := ReadIntegrateById(h, h.sendId)
	//手续费
	charge := account / 20
	if charge < 1 {
		charge = 1
	}

	if sendIntegrate.Score < account+charge {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("你必须保留足够的余额(10)和手续费"))
		return
	}

	//检查接受者账户
	third := resp.Data.MessageChain[2]
	if third.Type != "At" {
		return
	}
	thirdIntegrate := ReadIntegrateById(h, third.Target)

	//更新转账人额度
	sendIntegrate.Score -= account + charge

	//更新接受者额度
	thirdIntegrate.Score += account
	updateIntegrate(h, &sendIntegrate)
	updateIntegrate(h, &thirdIntegrate)
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 转账成功 , 扣除手续费 %v , 到账 %v", charge, account))
}

// IntegrateLoot 打劫功能
func (h *WsHandler) IntegrateLoot(resp models.RespMessage) {
	senderId := resp.Data.Sender.Id
	groupId := resp.Data.Sender.Group.Id
	//打劫里面所有at的人
	for _, v := range resp.Data.MessageChain {
		//不能打劫机器人,不能打劫自己
		if v.Type == "At" && v.Target != h.AppConfig.BindQ && v.Target != senderId {
			senderIntegrate := ReadIntegrateById(h, senderId)
			b, _ := rand.Int(rand.Reader, big.NewInt(1000))
			pLuck := SearchLootProp(h)
			//我方积分
			a := time.Now().Unix() - senderIntegrate.LastLootTime.Unix()
			if a < 600 && pLuck != 10000 {
				h.client.SendGroupMessage(groupId, []models.MessageChain{
					{Type: "At", Target: senderId},
					{Type: "Plain", Text: fmt.Sprintf("请 %v 秒再试", 600-a)},
				})
				return
			}
			if pLuck != 10000 {
				senderIntegrate.LastLootTime = time.Now()
			}
			//对方积分
			thirdly := ReadIntegrateById(h, v.Target)

			//查询幸运值
			senderAtt := models.BasicAttributes{}
			h.Ds.Common().GetByID(h.sendId, &senderAtt)
			thirdAtt := models.BasicAttributes{}
			h.Ds.Common().GetByID(v.Target, &thirdAtt)
		L:
			getScore, _ := rand.Int(rand.Reader, big.NewInt(10))
			if getScore.Int64() == 0 {
				goto L
			}
			//幸运加成,仅当天有效
			if time.Now().Year() != senderIntegrate.LastLuckTime.Year() || time.Now().Month() != senderIntegrate.LastLuckTime.Month() || time.Now().Day() != senderIntegrate.LastLuckTime.Day() {
				senderAtt.Luck = 0
				updateIntegrate(h, &senderIntegrate)
			}

			if time.Now().Year() != thirdly.LastLuckTime.Year() || time.Now().Month() != thirdly.LastLuckTime.Month() || time.Now().Day() != thirdly.LastLuckTime.Day() {
				thirdAtt.Luck = 0
				updateIntegrate(h, &thirdly)
			}
			//有30%几率从对方身上拿到随机分数(0-10分)
			//300+-50
			lucy := 300 + senderAtt.Luck - thirdAtt.Luck + pLuck

			//检索道具
			if b.Int64() < lucy {
				//对方积分不足时
				if thirdly.Score < getScore.Int64() {
					//对方没钱
					if thirdly.Score <= 0 {
						h.client.SendGroupMessage(groupId, []models.MessageChain{
							{Type: "Plain", Text: "他已经没有钱可以被打劫了"},
						})
					} else {
						//标记被扒了多少钱
						getScore.SetInt64(thirdly.Score)
						//对方有钱但不够扒
						senderIntegrate.Score += thirdly.Score
						thirdly.Score = 0
						updateIntegrate(h, &senderIntegrate)
						updateIntegrate(h, &thirdly)
						h.client.SendGroupMessage(groupId, []models.MessageChain{
							{Type: "Plain", Text: "打劫成功 , 你从 "},
							{Type: "At", Target: v.Target},
							{Type: "Plain", Text: fmt.Sprintf(" 扒光了 %v 积分 , 当前积分为: %v", getScore, senderIntegrate.Score)},
						})
					}
				} else {
					senderIntegrate.Score += getScore.Int64()
					thirdly.Score -= getScore.Int64()
					updateIntegrate(h, &senderIntegrate)
					updateIntegrate(h, &thirdly)
					h.client.SendGroupMessage(groupId, []models.MessageChain{
						{Type: "Plain", Text: "打劫成功 , 你从 "},
						{Type: "At", Target: v.Target},
						{Type: "Plain", Text: fmt.Sprintf(" 获取了 %v 积分 , 当前积分为: %v", getScore, senderIntegrate.Score)},
					})
				}
			} else {
				//扣分
				//读取被扣分的人还有多少分扣,没有分也是可以打劫的,但是最多只能扣掉所有分
				if senderIntegrate.Score < getScore.Int64() {
					if senderIntegrate.Score <= 0 {
						//我方没钱
						updateIntegrate(h, &senderIntegrate)
						h.client.SendGroupMessage(groupId, []models.MessageChain{
							{Type: "Plain", Text: "打劫失败 , 还好你身上没有钱 "},
						})

					} else {
						//我方有钱但不够扣
						getScore.SetInt64(senderIntegrate.Score)
						thirdly.Score += senderIntegrate.Score
						senderIntegrate.Score = 0
						updateIntegrate(h, &senderIntegrate)
						updateIntegrate(h, &thirdly)
						h.client.SendGroupMessage(groupId, []models.MessageChain{
							{Type: "Plain", Text: "打劫失败 , 你被 "},
							{Type: "At", Target: v.Target},
							{Type: "Plain", Text: fmt.Sprintf(" 扒掉了 %v 积分 , 你的钱已经被扒光了", getScore)},
						})
					}
				} else {
					senderIntegrate.Score -= getScore.Int64()
					thirdly.Score += getScore.Int64()
					updateIntegrate(h, &senderIntegrate)
					updateIntegrate(h, &thirdly)
					h.client.SendGroupMessage(groupId, []models.MessageChain{
						{Type: "Plain", Text: "打劫失败 , 你被 "},
						{Type: "At", Target: v.Target},
						{Type: "Plain", Text: fmt.Sprintf(" 扒掉了 %v 积分 , 当前积分为: %v", getScore, senderIntegrate.Score)},
					})
				}
			}
		}

	}
}

//打劫算法
//有几率从对方获取到积分

// 签到
func signed(h *WsHandler, groupId, senderId uint64) {
	i := ReadIntegrateById(h, senderId)
	if i.LastSignInTime.Year() == time.Now().Year() && i.LastSignInTime.Month() == time.Now().Month() && i.LastSignInTime.Day() == time.Now().Day() {
		//今日已经签到
		h.client.SendGroupMessageWithString(groupId, senderId, ` 你今日已经签过到咯 ! 请明天再来吧 . `)
	} else {
		//计算累计签到
		//判断是否累积
		//12月31号0点 - 1月1号23:59 =

		if time.Now().Format("2006-01-02") == i.LastSignInTime.Add(24*time.Hour).Format("2006-01-02") {
			i.LastSignInTime = time.Now()
			i.Score = i.Score + 5 + i.ContinuousSignTimes
			i.ContinuousSignTimes += 1
		} else {
			i.LastSignInTime = time.Now()
			i.Score += 5
			i.ContinuousSignTimes = 0
		}
		updateIntegrate(h, &i)
		if i.ContinuousSignTimes != 0 {
			h.client.SendGroupMessageWithString(groupId, senderId, fmt.Sprintf(` 今日签到成功 , 您已累计签到 %v 天 , 当前的积分为: %v`, i.ContinuousSignTimes, strconv.FormatInt(i.Score, 10)))
		} else {
			h.client.SendGroupMessageWithString(groupId, senderId, ` 今日签到成功 , 您当前的积分为: `+strconv.FormatInt(i.Score, 10))
		}
	}
}

// ReadIntegrateById 读取某人的积分
func ReadIntegrateById(h *WsHandler, id uint64) models.Integrate {
	i := models.Integrate{
		Id: id,
	}
	err := h.Ds.Common().GetByID(id, &i)
	if err == gorm.ErrRecordNotFound {
		fmt.Println(err)
		createIntegrate(h, id)
		return ReadIntegrateById(h, id)
	}
	return i
}

func updateIntegrate(h *WsHandler, integrate *models.Integrate) {
	err := h.Ds.Common().Update(nil, integrate)
	if err != nil {
		fmt.Println(err)
	}
}

func createIntegrate(h *WsHandler, id uint64) {
	integrate := models.Integrate{
		Id: id,
	}
	h.Ds.Common().Create(&integrate)
}

// 抽签
func lots(h *WsHandler) {
	send := ReadIntegrateById(h, h.sendId)
	//一天只能抽一次签
	if time.Now().Year() == send.LastLuckTime.Year() && time.Now().Month() == send.LastLuckTime.Month() && time.Now().Day() == send.LastLuckTime.Day() {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("一天只能求签一次"))
		return
	}
	b, _ := rand.Int(rand.Reader, big.NewInt(1000))
	switch {
	case b.Int64() < 100: //大吉
		send.Luck = 100
		mcs := []models.MessageChain{
			{Type: "Image", Base64: image_pkg.ImgPath2Base64(fmt.Sprintf(`./image/抽签/%v.png`, GetRandomMap(BigLucyRandomMap)))},
		}
		h.client.SendGroupMessage(h.Gid, mcs)
	case b.Int64() < 300 && b.Int64() >= 100: //吉
		send.Luck = 80
		mcs := []models.MessageChain{
			{Type: "Image", Base64: image_pkg.ImgPath2Base64(fmt.Sprintf(`./image/抽签/%v.png`, GetRandomMap(LucyRandomMap)))},
		}
		h.client.SendGroupMessage(h.Gid, mcs)
	case b.Int64() < 500 && b.Int64() >= 300: //中吉
		send.Luck = 30
		mcs := []models.MessageChain{
			{Type: "Image", Base64: image_pkg.ImgPath2Base64(fmt.Sprintf(`./image/抽签/%v.png`, GetRandomMap(CentreLucyRandomMap)))},
		}
		h.client.SendGroupMessage(h.Gid, mcs)
	case b.Int64() < 700 && b.Int64() >= 500: //末吉
		send.Luck = 10
		mcs := []models.MessageChain{
			{Type: "Image", Base64: image_pkg.ImgPath2Base64(fmt.Sprintf(`./image/抽签/%v.png`, GetRandomMap(LittleLucyRandomMap)))},
		}
		h.client.SendGroupMessage(h.Gid, mcs)
	case b.Int64() < 900 && b.Int64() >= 700: //凶
		send.Luck = -20
		mcs := []models.MessageChain{
			{Type: "Image", Base64: image_pkg.ImgPath2Base64(fmt.Sprintf(`./image/抽签/%v.png`, GetRandomMap(DangerousRandomMap)))},
		}
		h.client.SendGroupMessage(h.Gid, mcs)
	case b.Int64() < 1000 && b.Int64() >= 900: //大凶
		send.Luck = -50
		mcs := []models.MessageChain{
			{Type: "Image", Base64: image_pkg.ImgPath2Base64(fmt.Sprintf(`./image/抽签/%v.png`, GetRandomMap(BigDangerousRandomMap)))},
		}
		h.client.SendGroupMessage(h.Gid, mcs)
	}
	send.LastLuckTime = time.Now()
	updateIntegrate(h, &send)
}

var LucyType = map[int64]string{
	100: "大吉",
	80:  "吉",
	30:  "中吉",
	10:  "末吉",
	-20: "凶",
	-50: "大凶",
	0:   "无",
}

var BigLucyRandomMap = map[int]string{
	1: "大吉1",
	2: "大吉2",
	3: "大吉3",
	4: "大吉4",
}

var CentreLucyRandomMap = map[int]string{
	1: "中吉1",
	2: "中吉2",
}
var LucyRandomMap = map[int]string{
	1: "吉1",
	2: "吉2",
	3: "吉3",
}

var LittleLucyRandomMap = map[int]string{
	1: "末吉1",
	2: "末吉2",
	3: "末吉3",
	4: "末吉4",
	5: "末吉5",
}

var DangerousRandomMap = map[int]string{
	1: "凶1",
	2: "凶2",
}
var BigDangerousRandomMap = map[int]string{
	1: "大凶",
}

var TopFormat = map[int]string{
	0: "👑",
	1: "♠",
	2: "♥",
	3: "♣",
	4: "♦",
}

func Top5(h *WsHandler) {
	//用来记录id和名字的
	Names := make(map[uint64]string)

	list := h.client.MemberList(h.Gid)
	members := make([]any, len(list.Data.MemberList))

	for k, v := range list.Data.MemberList {
		members[k] = v.Id
		Names[v.Id] = v.MemberName
	}
	top5 := make([]models.Integrate, 0)
	filters := repository.Filters{
		InFilter: map[string][]any{
			"id": members,
		},
		Size:    5,
		OrderBy: "score desc",
	}
	fmt.Println(list)
	h.Ds.Common().GetAllWithFilter(filters, models.Integrate{}, &top5)

	//发送积分榜
	mcs := make([]models.MessageChain, len(top5))
	for k, v := range top5 {
		mcs[k] = models.MessageChain{
			Type: "Plain",
			Text: fmt.Sprintf("\n%v    [ %v  积分: %v ]\n", TopFormat[k], Names[v.Id], v.Score),
		}
	}
	at := make([]models.MessageChain, 1)
	at[0] = models.MessageChain{
		Type: "Plain", Text: fmt.Sprintf("\t\t✨积分榜✨	\n"),
	}
	mcs = append(at, mcs...)
	h.client.SendGroupMessage(h.Gid, mcs)
}

// 要饭
func beg(h *WsHandler) {
	b := models.BegMap{}
	err := h.Ds.Common().GetByID(h.sendId, &b)
	if err != gorm.ErrRecordNotFound {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("你正在要饭中 .. 剩余要饭次数为 %v ...", 3-b.Times))
		return
	}
	err = h.Ds.Common().Create(&models.BegMap{
		Id:      h.sendId,
		GroupID: h.Gid,
		Name:    h.resp.Data.Sender.MemberName,
	})
	if err == nil {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf(" %v 正在要饭中 .. 求路过老爷打赏 ...", h.resp.Data.Sender.MemberName))
	}
}

// 停止要饭
func noBeg(h *WsHandler) {
	b := models.BegMap{}
	err := h.Ds.Common().GetByID(h.sendId, &b)
	if err == gorm.ErrRecordNotFound {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 你没有在要饭 "))
		return
	}
	err = h.Ds.Common().Delete(&b)
	if err == nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 停止要饭中 .. 总共要得 %v 块钱 , 把今天的收获拿去挥洒吧 ...", b.SumScore))
	}
}

// GiveAReward 打赏
func GiveAReward(h *WsHandler, msg string) {
	//打赏所有要饭的
	//打赏多少钱
	moneyStr := regexp.MustCompile(`^打赏[0-9]*$|^打赏`).FindString(msg)
	moneyStr = strings.ReplaceAll(moneyStr, "打赏", "")
	money, err := strconv.ParseInt(moneyStr, 10, 0)
	if err != nil || money == 0 {
		fmt.Println(err)
		money = 1
	}
	//检查一下有多少要饭的
	begs := make([]models.BegMap, 0)
	err = h.Ds.Common().GetAllWithFilter(repository.Filters{}, models.BegMap{}, &begs)
	if err != nil {
		fmt.Println(err)
	}
	//获取要饭人数
	boys := len(begs)
	if boys > 0 {
		//你够不够钱
		sendI := ReadIntegrateById(h, h.sendId)
		if sendI.Score < int64(boys)*money {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 老爷 , 您兜里只有 %v 块钱 , 不够打赏给乞丐们 ", sendI.Score))
			return
		}
		if boys == 1 && begs[0].Id == h.sendId {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 现在只有你在要饭 , 你不能打赏给你自己 "))
			return
		}
		sendI.Score -= int64(boys) * money
		updateIntegrate(h, &sendI)
		for _, v := range begs {
			if h.sendId == v.Id {
				continue
			}
			trI := ReadIntegrateById(h, v.Id)
			trI.Score += money
			updateIntegrate(h, &trI)
			h.client.SendGroupMessageWithString(h.Gid, v.Id, fmt.Sprintf(" %v 老爷打赏了你 %v 块钱", h.resp.Data.Sender.MemberName, money))
			v.Times += 1
			v.SumScore += money
			if v.Times == 3 {
				h.Ds.Common().Delete(&models.BegMap{
					Id:      v.Id,
					GroupID: v.GroupID,
				})
				h.client.SendGroupMessageWithString(h.Gid, v.Id, fmt.Sprintf(" 你的要饭之旅已经结束 , 总共要得 %v 块钱 , 把今天的收获拿去挥洒吧 ... ", v.SumScore))
			} else {
				h.Ds.Common().Update(nil, &v)
			}
		}
	} else {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 老爷 , 目前街上没有要饭的 "))
	}
}

func SearchLootProp(h *WsHandler) int64 {
	back := make([]models.Backpack, 0)
	f := repository.Filters{
		Filter: map[string]interface{}{
			"holder_id": h.sendId,
			"prop_id":   1,
			"type":      1,
		},
	}
	h.Ds.Common().GetAllWithFilter(f, nil, &back)
	if len(back) != 0 {
		for _, v := range back {
			//道具-1
			if v.Count > 1 {
				b := v
				b.Count -= 1
				h.Ds.Common().Update(map[string]any{
					"holder_id": h.sendId,
					"prop_id":   1,
				}, &b)
			} else {
				b := models.Backpack{
					HolderID: h.sendId,
					Prop: models.Prop{
						PropId: v.PropId,
					},
				}
				h.Ds.Common().Delete(&b)
			}
			return v.Luck
		}
	}
	return 0
}
