package handler

import (
	"crypto/rand"
	"errors"
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	"math/big"
	"qqbot/cmd/qqbot/models"
	"qqbot/cmd/qqbot/repository"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var LOLMap map[uint64]models.LOLUser

func (h *WsHandler) CookieOnline() {
	//定时从数据库获取用户来轮询保证cookie活性
	for {
		users := make([]models.LOLUser, 0)
		filters := repository.Filters{
			NeFilter: map[string]interface{}{
				"cookie": "",
			},
		}
		h.Ds.Common().GetAllWithFilter(filters, models.LOLUser{}, &users)
		for _, v := range users {
			accountId, err := CheckCookie(v.Cookie)
			if err != nil || accountId == "" {
				v.Cookie = ""
				h.Ds.Common().Update(nil, v)
				h.client.SendGroupMessageWithString(v.Gid, v.ID, fmt.Sprintf(" 您的英雄联盟绑定已到期"))
				continue
			}
			//获取最新战绩
			res, err := req.SetHeader("Cookie", v.Cookie).Get(`https://lol.sw.game.qq.com/lol/api/?c=Battle&a=matchList&areaId=1&accountId=` + accountId + `&r1=matchList`)
			if err != nil {
				fmt.Println(err)
				continue
			}
			body, err := io.ReadAll(res.Body)
			if len(body) < 15 {
				continue
			}
			body = body[15:]
			games := gjson.GetBytes(body, "msg.games").Array()
			if len(games) == 0 {
				continue
			}
			gameId := games[0].Get("gameId").String()
			h.Ds.GameService().SteLoLGameId(123)
			g, e := h.Ds.GameService().GetLoLNewGameId()
			fmt.Println(g, e)
			//跳过已经记录的游戏
			if gameId == v.LastGame {
				continue
			}
			v.LastGame = gameId
			//根据玩的模式加一张卡
			queue := games[0].Get("queue").String()
			b, _ := rand.Int(rand.Reader, big.NewInt(1000))
			switch queue {
			case "420", "440":
				//50%几率
				if b.Int64() <= 250 {
					_, p, _ := h.Ds.GameService().AddBack(v.ID, 1, 1)
					h.client.SendGroupMessageWithString(v.Gid, v.ID, fmt.Sprintf(" 在峡谷逛GAI时 , 意外捡到一张 %v", p.Name))
				}
			case "1900", "450", "430", "1400":
				//30%几率
				if b.Int64() <= 150 {
					_, p, _ := h.Ds.GameService().AddBack(v.ID, 1, 1)
					h.client.SendGroupMessageWithString(v.Gid, v.ID, fmt.Sprintf(" 在峡谷逛GAI时 , 意外捡到一张 %v", p.Name))
				}
			}
			h.Ds.Common().Update(nil, v)
			//结算系统
			//获取当前最后的游戏id

		}
		time.Sleep(time.Minute)
	}
}

//英雄联盟团队结算

func LoLTeamStatement(h *WsHandler, gid, uid uint64) {
	//获取自己团队信息
	gameId, err := h.Ds.GameService().GetLoLNewGameId()
	fmt.Println(gameId, err)
}

func (h *WsHandler) LOL() {
	for _, v := range h.resp.Data.MessageChain {
		if v.Type == "Plain" {
			switch {
			case v.Text == "lol战绩" || v.Text == "英雄联盟战绩":
				LOLGameList(h)
			case v.Text == "lol绑定" || v.Text == "LOL绑定" || v.Text == "英雄联盟绑定":
				go PtQrLogin(h, h.Gid, h.sendId)
			}
		}
	}
}

func LOLRoseNotBind(h *WsHandler) {
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("你的角色未绑定·请回复:lol绑定 或 英雄联盟绑定,进行绑定"))
}

// QueueRating 查询隐藏分
func QueueRating(h *WsHandler) {
	user := models.LOLUser{
		Base: models.Base{
			ID: h.sendId,
		},
	}
	err := h.Ds.Common().GetOneWithFilter(user, &user)
	if err != nil {
		LOLRoseNotBind(h)
		return
	}
	if user.Cookie == "" {
		LOLRoseNotBind(h)
		return
	}
	//更新一下lolMap
	LOLMap = map[uint64]models.LOLUser{
		h.sendId: user,
	}
	res, err := req.SetHeader("Cookie", user.Cookie).Get(`https://lol.sw.game.qq.com/lol/api/?c=Battle&a=matchList&areaId=1&accountId=` + user.AccountId + `&r1=matchList`)
	if err != nil {
		fmt.Println(err)
		return
	}
	body, err := io.ReadAll(res.Body)
	body = body[15:]
	//解析json
	list5 := gjson.GetBytes(body, "msg.games").Array()
	if len(list5) == 0 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 战绩信息为空")
	}
	mcs := make([]models.MessageChain, 0)
	for k, v := range list5 {
		if k == 1 {
			break
		}
		gameId := v.Get("gameId").String()
		res, err := req.SetHeader("Cookie", user.Cookie).Get(`https://lol.sw.game.qq.com/lol/api/?c=Battle&a=combatGains&areaId=1&gameId=` + gameId + `&r1=combatGains`)
		if err != nil {
			fmt.Println(err)
			return
		}
		body, err := io.ReadAll(res.Body)
		body = body[17:]
		//解析json
		game := gjson.GetBytes(body, "msg.participants").Array()
		for _, v := range game {
			if v.Get("currentAccountId").String() == LOLMap[h.sendId].AccountId {
				//隐藏分
				queueRating := v.Get("queueRating").String()
				//其他玩家隐藏分

				//经济补刀
				mcs = append(mcs, models.MessageChain{
					Type:   "At",
					Target: h.sendId,
				})
				mcs = append(mcs, models.MessageChain{
					Type: "Plain",
					Text: fmt.Sprintf(" 您目前最新的隐藏分为: %v ", queueRating),
				})
			}
		}
	}
	h.client.SendGroupMessage(h.Gid, mcs)
}

// LOLGameList 获取战绩信息
func LOLGameList(h *WsHandler) {
	user := models.LOLUser{
		Base: models.Base{
			ID: h.sendId,
		},
	}
	err := h.Ds.Common().GetOneWithFilter(user, &user)
	if err != nil {
		LOLRoseNotBind(h)
		return
	}
	if user.Cookie == "" {
		LOLRoseNotBind(h)
		return
	}
	//更新一下lolMap
	LOLMap = map[uint64]models.LOLUser{
		h.sendId: user,
	}
	res, err := req.SetHeader("Cookie", user.Cookie).Get(`https://lol.sw.game.qq.com/lol/api/?c=Battle&a=matchList&areaId=1&accountId=` + user.AccountId + `&r1=matchList`)
	if err != nil {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 无法从服务器获取到您的战绩信息")
		return
	}
	body, err := io.ReadAll(res.Body)
	if len(body) < 15 {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 无法从服务器获取到您的战绩信息")
		return
	}
	body = body[15:]
	//解析json
	list := gjson.GetBytes(body, "msg.games").Array()
	mcs := make([]models.MessageChain, 0)

	//读取条数
	limitOf := 1
	text := h.resp.Data.MessageChain[1].Text
	results := regexp.MustCompile(`战绩\*[0-9]+`).FindAllString(text, -1)
	if len(results) != 0 {
		ta := strings.Split(text, "*")
		limitOf, _ = strconv.Atoi(ta[1])
	}

	if limitOf > 10 {
		limitOf = 10
	}

	for k, v := range list {
		if k == limitOf {
			break
		}

		gameId := v.Get("gameId").String()
		//https://lol.sw.game.qq.com/lol/api/?c=Battle&a=combatGains&areaId=1&gameId=7183156532&r1=combatGains
		//https://lol.sw.game.qq.com/lol/api/?c=Battle&a=combatGains&areaId=1&gameId=7183505301&r1=combatGains
		res, err := req.SetHeader("Cookie", user.Cookie).Get(`https://lol.sw.game.qq.com/lol/api/?c=Battle&a=combatGains&areaId=1&gameId=` + gameId + `&r1=combatGains`)
		if err != nil {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 无法从服务器获取到您的战绩信息")
			return
		}
		body, err := io.ReadAll(res.Body)
		body = body[17:]
		//解析json
		game := gjson.GetBytes(body, "msg.participants").Array()
		if len(game) == 0 {
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 战绩信息为空")
		}
		odermap := make(map[string]string)
		gameCreationTime := time.Unix(gjson.GetBytes(body, "msg.gameInfo.gameCreationTime").Int()/1e3, 0).Format("2006-01-02 15:04:05")
		gameMode := gjson.GetBytes(body, "msg.gameInfo.queueId").String()
		gameMode, has := GameModes[gameMode]
		if !has {
			gameMode = "未知"
		}
		myTeam := ""
		orderTeam := "200"
		//json =
		for _, v := range game {
			teamId := v.Get("teamId").String()
			//英雄
			champion := Champions[v.Get("championId").Int()].SearchString
			if champion == "" {
				champion = v.Get("championId").String()
			}
			kills := v.Get("stats.kills").String()
			deaths := v.Get("stats.deaths").String()
			assists := v.Get("stats.assists").String()

			if v.Get("currentAccountId").String() == LOLMap[h.sendId].AccountId {
				//胜利还是失败
				win := "失败"

				if v.Get("stats.winner").Bool() {
					win = "胜利"
				}
				//战绩
				myTeam = teamId
				if myTeam == "200" {
					orderTeam = "100"
				}

				minionsKilled := v.Get("stats.minionsKilled").Int() + v.Get("stats.neutralMinionsKilled").Int()
				goldEarned := v.Get("stats.goldEarned").String()

				//隐藏分
				queueRating := v.Get("queueRating").String()
				//其他玩家隐藏分

				//经济补刀
				mcs = append(mcs, models.MessageChain{
					Type: "Plain",
					Text: fmt.Sprintf("%v : [ %v %v %v %v/%v/%v %v/%v刀 %v 隐藏分: %v ) ]\n\n", k+1, gameMode, win, champion, kills, deaths, assists, goldEarned, minionsKilled, gameCreationTime, queueRating),
				})
			} else {
				summonerName := v.Get("summonerName").String()
				queueRating := v.Get("queueRating").String()
				if teamId == "100" {
					odermap["100"] += "\n[ " + summonerName + " * " + champion + fmt.Sprintf("  %v/%v/%v", kills, deaths, assists) + " 隐藏分: " + queueRating + " ]\n"
				} else {
					odermap["200"] += "\n[ " + summonerName + " * " + champion + fmt.Sprintf("  %v/%v/%v", kills, deaths, assists) + " 隐藏分: " + queueRating + " ]\n"
				}
			}
		}
		mcs = append(mcs, models.MessageChain{
			Type: "Plain",
			Text: fmt.Sprintf("该局其他玩家 :\n\n我方:\n%v\n敌方:\n%v\n", odermap[myTeam], odermap[orderTeam]),
		})
	}
	h.client.SendGroupMessage(h.Gid, mcs)
}

func LOLBind(h *WsHandler) {
	accountId, err := CheckCookie(h.resp.Data.MessageChain[1].Text)
	if err != nil {
		if h.Gid != 0 {
			mcs := []models.MessageChain{
				{Type: "Plain", Text: fmt.Sprintf("绑定失败")},
			}
			h.client.SendTempMessage(h.Gid, h.sendId, mcs)
			return
		} else {
			h.client.SendFriendMessageWithString(h.sendId, fmt.Sprintf("绑定失败"))
			return
		}
	}
	user := models.LOLUser{
		Base: models.Base{
			ID: h.sendId,
		},
		Cookie:    h.resp.Data.MessageChain[1].Text,
		AccountId: accountId,
	}
	h.Ds.Common().Update(nil, &user)
	SessionTypeMap[h.sendId] = 0
	if h.Gid != 0 {
		mcs := []models.MessageChain{
			{Type: "Plain", Text: fmt.Sprintf("绑定成功")},
		}
		h.client.SendTempMessage(h.Gid, h.sendId, mcs)
	} else {
		h.client.SendFriendMessageWithString(h.sendId, fmt.Sprintf("绑定成功"))
	}
}

// CheckCookie 校验cookie
func CheckCookie(cookie string) (string, error) {
	res, err := req.SetHeader("Cookie", cookie).Get(`https://lol.ams.game.qq.com/lol/Go/dollclip/GetUserGame?actid=12&SearchType=LOLRole&areaid=1`)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	body, err := io.ReadAll(res.Body)
	accountId := gjson.GetBytes(body, "LOLRole.accountId").String()

	if accountId == "" {
		err = errors.New("校验失败")
	}
	return accountId, err
}

var GameModes = map[string]string{
	"1400": "终极魔典",
	"420":  "单双排",
	"430":  "匹配",
	"440":  "灵活组排",
	"450":  "极地大乱斗",
	"900":  "无限乱斗",
	"830":  "人机对战",
	"1900": "无限火力",
}

var Champions = map[int64]models.LOLChampSearch{
	1: {
		ChampionId:   "1",
		SearchString: "黑暗之女·安妮",
	},
	2: {
		ChampionId:   "2",
		SearchString: "狂战士·奥拉夫",
	},
	3: {
		ChampionId:   "3",
		SearchString: "哨兵之殇·加里奥",
	},
	4: {
		ChampionId:   "4",
		SearchString: "卡牌大师·崔斯特",
	},
	5: {
		ChampionId:   "5",
		SearchString: "德邦总管·赵信",
	},
	6: {
		ChampionId:   "6",
		SearchString: "首领之傲·厄加特",
	},
	7: {
		ChampionId:   "7",
		SearchString: "诡术妖姬·乐芙兰",
	},
	8: {
		ChampionId:   "8",
		SearchString: "猩红收割者·弗拉基米尔",
	},
	9: {
		ChampionId:   "9",
		SearchString: "末日使者·费德提克",
	},
	10: {
		ChampionId:   "10",
		SearchString: "审判天使·凯尔",
	},
	11: {
		ChampionId:   "11",
		SearchString: "无极剑圣·易",
	},
	12: {
		ChampionId:   "12",
		SearchString: "牛头酋长·阿利斯塔",
	},
	13: {
		ChampionId:   "13",
		SearchString: "流浪法师·瑞兹",
	},
	14: {
		ChampionId:   "14",
		SearchString: "亡灵勇士·亡灵战神",
	},
	15: {
		ChampionId:   "15",
		SearchString: "战争女神·希维尔",
	},
	16: {
		ChampionId:   "16",
		SearchString: "众星之子·索拉卡",
	},
	17: {
		ChampionId:   "17",
		SearchString: "迅捷斥候·提莫",
	},
	18: {
		ChampionId:   "18",
		SearchString: "麦林炮手·崔丝塔娜",
	},
	19: {
		ChampionId:   "19",
		SearchString: "嗜血猎手·沃里克",
	},
	20: {
		ChampionId:   "20",
		SearchString: "雪人骑士·努努",
	},
	21: {
		ChampionId:   "21",
		SearchString: "赏金猎人·厄运小姐",
	},
	22: {
		ChampionId:   "22",
		SearchString: "寒冰射手·艾希",
	},
	23: {
		ChampionId:   "23",
		SearchString: "蛮族之王·泰达米尔",
	},
	24: {
		ChampionId:   "24",
		SearchString: "武器大师·贾克斯",
	},
	25: {
		ChampionId:   "25",
		SearchString: "堕落天使·莫甘娜",
	},
	26: {
		ChampionId:   "26",
		SearchString: "时光守护者·基兰",
	},
	27: {
		ChampionId:   "27",
		SearchString: "炼金术士·辛吉德",
	},
	28: {
		ChampionId:   "28",
		SearchString: "寡妇制造者·伊芙琳",
	},
	29: {
		ChampionId:   "29",
		SearchString: "瘟疫之源·图奇",
	},
	30: {
		ChampionId:   "30",
		SearchString: "死亡颂唱者·卡尔萨斯",
	},
	31: {
		ChampionId:   "31",
		SearchString: "虚空恐惧·科加斯",
	},
	32: {
		ChampionId:   "32",
		SearchString: "殇之木乃伊·阿木木",
	},
	33: {
		ChampionId:   "33",
		SearchString: "披甲龙龟·拉莫斯",
	},
	34: {
		ChampionId:   "34",
		SearchString: "冰晶凤凰·艾尼维亚",
	},
	35: {
		ChampionId:   "35",
		SearchString: "恶魔小丑·萨科",
	},
	36: {
		ChampionId:   "36",
		SearchString: "祖安狂人·蒙多医生",
	},
	37: {
		ChampionId:   "37",
		SearchString: "琴瑟仙女·娑娜",
	},
	38: {
		ChampionId:   "38",
		SearchString: "虚空行者·卡萨丁",
	},
	39: {
		ChampionId:   "39",
		SearchString: "刀锋意志·艾瑞莉娅",
	},
	40: {
		ChampionId:   "40",
		SearchString: "风暴之怒·迦娜",
	},
	41: {
		ChampionId:   "41",
		SearchString: "海洋之灾·普朗克",
	},
	42: {
		ChampionId:   "42",
		SearchString: "英勇投弹手·库奇",
	},
	43: {
		ChampionId:   "43",
		SearchString: "天启者·卡尔玛",
	},
	44: {
		ChampionId:   "44",
		SearchString: "宝石骑士·塔里克",
	},
	45: {
		ChampionId:   "45",
		SearchString: "邪恶小法师·维迦",
	},
	48: {
		ChampionId:   "48",
		SearchString: "诅咒巨魔·特朗德尔",
	},
	50: {
		ChampionId:   "50",
		SearchString: "策士统领·斯维因",
	},
	51: {
		ChampionId:   "51",
		SearchString: "皮城女警·凯特琳",
	},
	53: {
		ChampionId:   "53",
		SearchString: "蒸汽机器人·布里茨",
	},
	54: {
		ChampionId:   "54",
		SearchString: "熔岩巨兽·墨菲特",
	},
	55: {
		ChampionId:   "55",
		SearchString: "不祥之刃·卡特琳娜",
	},
	56: {
		ChampionId:   "56",
		SearchString: "永恒梦魇·魔腾",
	},
	57: {
		ChampionId:   "57",
		SearchString: "扭曲树精·茂凯",
	},
	58: {
		ChampionId:   "58",
		SearchString: "荒漠屠夫·雷克顿",
	},
	59: {
		ChampionId:   "59",
		SearchString: "德玛西亚皇子·嘉文四世",
	},
	60: {
		ChampionId:   "60",
		SearchString: "蜘蛛女皇·伊莉丝",
	},
	61: {
		ChampionId:   "61",
		SearchString: "发条魔灵·奥莉安娜",
	},
	62: {
		ChampionId:   "62",
		SearchString: "齐天大圣·孙悟空",
	},
	63: {
		ChampionId:   "63",
		SearchString: "复仇焰魂·布兰德",
	},
	64: {
		ChampionId:   "64",
		SearchString: "盲僧·李青",
	},
	67: {
		ChampionId:   "67",
		SearchString: "暗夜猎手·薇恩",
	},
	68: {
		ChampionId:   "68",
		SearchString: "机械公敌·兰博",
	},
	69: {
		ChampionId:   "69",
		SearchString: "魔蛇之拥·卡西奥佩娅",
	},
	72: {
		ChampionId:   "72",
		SearchString: "水晶先锋·斯卡纳",
	},
	74: {
		ChampionId:   "74",
		SearchString: "大发明家·黑默丁格",
	},
	75: {
		ChampionId:   "75",
		SearchString: "沙漠死神·内瑟斯",
	},
	76: {
		ChampionId:   "76",
		SearchString: "狂野女猎手·奈德丽",
	},
	77: {
		ChampionId:   "77",
		SearchString: "野兽之灵·乌迪尔",
	},
	78: {
		ChampionId:   "78",
		SearchString: "圣锤之毅·波比",
	},
	79: {
		ChampionId:   "79",
		SearchString: "酒桶·古拉加斯",
	},
	80: {
		ChampionId:   "80",
		SearchString: "战争之王·潘森",
	},
	81: {
		ChampionId:   "81",
		SearchString: "探险家·伊泽瑞尔",
	},
	82: {
		ChampionId:   "82",
		SearchString: "铁铠冥魂·莫德凯撒",
	},
	83: {
		ChampionId:   "83",
		SearchString: "掘墓者·约里克",
	},
	84: {
		ChampionId:   "84",
		SearchString: "暗影之拳·阿卡丽",
	},
	85: {
		ChampionId:   "85",
		SearchString: "狂暴之心·凯南",
	},
	86: {
		ChampionId:   "86",
		SearchString: "德玛西亚之力·盖伦",
	},
	89: {
		ChampionId:   "89",
		SearchString: "曙光女神·蕾欧娜",
	},
	90: {
		ChampionId:   "90",
		SearchString: "虚空先知·玛尔扎哈",
	},
	91: {
		ChampionId:   "91",
		SearchString: "刀锋之影·泰隆",
	},
	92: {
		ChampionId:   "92",
		SearchString: "放逐之刃·锐雯",
	},
	96: {
		ChampionId:   "96",
		SearchString: "深渊巨口·克格莫",
	},
	98: {
		ChampionId:   "98",
		SearchString: "暮光之眼·慎",
	},
	99: {
		ChampionId:   "99",
		SearchString: "光辉女郎·拉克丝",
	},
	101: {
		ChampionId:   "101",
		SearchString: "远古巫灵·泽拉斯",
	},
	102: {
		ChampionId:   "102",
		SearchString: "龙血武姬·希瓦娜",
	},
	103: {
		ChampionId:   "103",
		SearchString: "九尾妖狐·阿狸",
	},
	104: {
		ChampionId:   "104",
		SearchString: "法外狂徒·格雷福斯",
	},
	105: {
		ChampionId:   "105",
		SearchString: "潮汐海灵·菲兹",
	},
	106: {
		ChampionId:   "106",
		SearchString: "雷霆咆哮·沃利贝尔",
	},
	107: {
		ChampionId:   "107",
		SearchString: "傲之追猎者·雷恩加尔",
	},
	110: {
		ChampionId:   "110",
		SearchString: "惩戒之箭·韦鲁斯",
	},
	111: {
		ChampionId:   "111",
		SearchString: "深海泰坦·诺提勒斯",
	},
	112: {
		ChampionId:   "112",
		SearchString: "机械先驱·维克托",
	},
	113: {
		ChampionId:   "113",
		SearchString: "凛冬之怒·瑟庄妮",
	},
	114: {
		ChampionId:   "114",
		SearchString: "无双剑姬·菲奥娜",
	},
	115: {
		ChampionId:   "115",
		SearchString: "爆破鬼才·吉格斯",
	},
	117: {
		ChampionId:   "117",
		SearchString: "仙灵女巫·璐璐",
	},
	119: {
		ChampionId:   "119",
		SearchString: "荣耀行刑官·德莱文",
	},
	120: {
		ChampionId:   "120",
		SearchString: "战争之影·赫卡里姆",
	},
	121: {
		ChampionId:   "121",
		SearchString: "虚空掠夺者·卡兹克",
	},
	122: {
		ChampionId:   "122",
		SearchString: "诺克萨斯之手·德莱厄斯",
	},
	126: {
		ChampionId:   "126",
		SearchString: "未来守护者·杰斯",
	},
	127: {
		ChampionId:   "127",
		SearchString: "冰霜女巫·丽桑卓",
	},
	131: {
		ChampionId:   "131",
		SearchString: "皎月女神·黛安娜",
	},
	133: {
		ChampionId:   "133",
		SearchString: "德玛西亚之翼·奎因",
	},
	134: {
		ChampionId:   "134",
		SearchString: "暗黑元首·辛德拉",
	},
	143: {
		ChampionId:   "143",
		SearchString: "荆棘之兴·婕拉",
	},
	150: {
		ChampionId:   "150",
		SearchString: "迷失之牙·纳尔",
	},
	154: {
		ChampionId:   "154",
		SearchString: "生化魔人·扎克",
	},
	157: {
		ChampionId:   "157",
		SearchString: "疾风剑豪·亚索",
	},
	161: {
		ChampionId:   "161",
		SearchString: "虚空之眼·维克兹",
	},
	201: {
		ChampionId:   "201",
		SearchString: "弗雷尔卓德·弗雷尔卓德之心",
	},
	203: {
		ChampionId:   "203",
		SearchString: "永猎双子·千珏",
	},
	222: {
		ChampionId:   "222",
		SearchString: "金克丝",
	},
	223: {
		ChampionId:   "223",
		SearchString: "塔姆·河流之王",
	},
	236: {
		ChampionId:   "236",
		SearchString: "圣枪游侠·卢锡安",
	},
	238: {
		ChampionId:   "238",
		SearchString: "影流之主·劫",
	},
	245: {
		ChampionId:   "245",
		SearchString: "艾克·时间刺客",
	},
	254: {
		ChampionId:   "254",
		SearchString: "皮城执法官·蔚",
	},
	266: {
		ChampionId:   "266",
		SearchString: "亚托克斯·暗裔剑魔",
	},
	267: {
		ChampionId:   "267",
		SearchString: "唤潮鲛姬·娜美",
	},
	268: {
		ChampionId:   "268",
		SearchString: "伊泽瑞尔",
	},
	412: {
		ChampionId:   "412",
		SearchString: "魂锁典狱长·锤石",
	},
	420: {
		ChampionId:   "420",
		SearchString: "海兽祭司·俄洛伊",
	},
	421: {
		ChampionId:   "421",
		SearchString: "雷克塞·虚空遁地兽",
	},
	429: {
		ChampionId:   "429",
		SearchString: "卡莉斯塔·卡莉丝塔",
	},
	432: {
		ChampionId:   "432",
		SearchString: "星界游神·巴德",
	},
	202: {
		ChampionId:   "202",
		SearchString: "烬·戏命师",
	},
	136: {
		ChampionId:   "136",
		SearchString: "铸星龙王·奥瑞利安",
	},
	163: {
		ChampionId:   "163",
		SearchString: "岩雀·塔莉垭",
	},
	240: {
		ChampionId:   "240",
		SearchString: "暴怒骑士·克烈",
	},
	427: {
		ChampionId:   "427",
		SearchString: "森林之友·艾翁",
	},
	164: {
		ChampionId:   "164",
		SearchString: "青钢影",
	},
	497: {
		ChampionId:   "497",
		SearchString: "洛·幻翎",
	},
	498: {
		ChampionId:   "498",
		SearchString: "霞·逆羽",
	},
	141: {
		ChampionId:   "141",
		SearchString: "凯隐·影流之镰",
	},
	516: {
		ChampionId:   "516",
		SearchString: "奥恩·山隐之焰",
	},
	555: {
		ChampionId:   "555",
		SearchString: "血港鬼影·派克",
	},
	777: {
		ChampionId:   "777",
		SearchString: "封魔剑魂·永恩",
	},
	360: {
		ChampionId:   "360",
		SearchString: "沙漠玫瑰·莎弥拉",
	},
	875: {
		ChampionId:   "875",
		SearchString: "腕豪·瑟提",
	},
	145: {
		ChampionId:   "145",
		SearchString: "虚空之女·卡莎",
	},
	235: {
		ChampionId:   "235",
		SearchString: "涤魂圣枪·赛娜",
	},
	221: {
		ChampionId:   "221",
		SearchString: "祖安花火·泽丽",
	},
	887: {
		ChampionId:   "887",
		SearchString: "灵罗娃娃·格温",
	},
	350: {
		ChampionId:   "350",
		SearchString: "魔法猫咪·悠米",
	},
	876: {
		ChampionId:   "350",
		SearchString: "含羞蓓蕾·莉莉娅",
	},
	517: {
		ChampionId:   "517",
		SearchString: "解脱者·塞拉斯",
	},
	166: {
		ChampionId:   "166",
		SearchString: "影哨·阿克尚",
	},
	523: {
		ChampionId:   "523",
		SearchString: "残月之肃·厄斐琉斯",
	},
	897: {
		ChampionId:   "897",
		SearchString: "纳祖芒荣耀·奎桑提",
	},
	234: {
		ChampionId:   "234",
		SearchString: "破败之王·佛耶戈",
	},
}
