package handler

import (
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"gorm.io/gorm"
	"io"
	"net/url"
	"qqbot/cmd/qqbot/models"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var LOLMap map[uint64]models.LOLUser

func (h *WsHandler) CookieOnline() {
}
func (h *WsHandler) LOL() {
	for _, v := range h.resp.Data.MessageChain {
		if v.Type == "Plain" {
			switch {
			case v.Text == "战绩" || v.Text == "英雄联盟战绩":
				GetLOLGame(h)
			case v.Text == "战绩列表":
				LOLGameList(h)
			case regexp.MustCompile(`^lol绑定#.*?#.*`).MatchString(v.Text):
				LOLBind(h)
			}
		}
	}
}

func LOLRoseNotBind(h *WsHandler) {
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(` 您的账号未绑定,请输入 "lol绑定#您的游戏名称#服务器名称" 进行绑定\n 注:一个qq号只能绑定一次`))
}
func LOLRoseNotBattle(h *WsHandler) {
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 查无战绩")
}

/*

 1 : [ 灵活组排 胜利 皮城女警·凯特琳 7/3/8 11486/189刀 2023-03-05 22:08:17 隐藏分: 1031 ) ]

该局其他玩家 :

我方:

[ 带你去峡谷看螃蟹 * 奥恩·山隐之焰  2/4/16 隐藏分: 1257 ]

[ 打我你必歪琴 * 暗黑元首·辛德拉  8/0/11 隐藏分: 1694 ]

[ Ndl疯狂卡丁车 * 邪恶小法师·维迦  7/1/12 隐藏分: 1195 ]

[ 屠天杀地之爹王 * 200  11/2/9 隐藏分: 1672 ]

敌方:

[ 零笙ZER0 * 生化魔人·扎克  2/9/3 隐藏分: 1257 ]

[ 快来救救你的蓝 * 虚空之女·卡莎  2/7/1 隐藏分: 1545 ]

[ 时速九厘米 * 涤魂圣枪·赛娜  1/4/4 隐藏分: 1207 ]

[ 黑色二手车真宽敞 * 德玛西亚之力·盖伦  5/5/0 隐藏分: 1106 ]

[ 九溪悦 * 卡牌大师·崔斯特  0/10/5 隐藏分: 1766 ]


*/

func GetLOLGame(h *WsHandler) {
	//先获取最后一局游戏的游戏id
	user := models.LOLUser{
		Base: models.Base{
			ID: h.sendId,
		},
	}
	err := h.Ds.Common().GetByID(h.sendId, &user)
	if err == gorm.ErrRecordNotFound {
		//未绑定
		LOLRoseNotBind(h)
		return
	}
	bs := LOLGetBattleListById(h, user.OpenId, "1")
	if len(bs) != 1 {
		LOLRoseNotBattle(h)
		return
	}
	gameId := bs[0].GameId

	bd := LOLGetBattleByGameId(h, user.OpenId, gameId)
	//回显战绩信息
	fmt.Println(bd)
	ms := make([]models.MessageChain, 0)
	ms = append(ms, models.MessageChain{Type: "At", Target: h.sendId})
	//时间戳转换
	timestamp, err := strconv.Atoi(bd.GameStartTime)
	if err != nil {
		fmt.Println(err)
		return
	}
	tm := time.Unix(int64(timestamp/1000), 0) // 将Unix时间戳转为time.Time类型
	startTime := tm.Format("01-02 15:04:05")
	endTime := tm.Add(time.Duration(bd.GameTimePlayed) * time.Second).Format("01-02 15:04:05")
	if len(bd.TeamDetails) != 2 {
		return
	}
	//灵活组排 时间-时间 比分
	title := fmt.Sprintf("\n\n[  %v 开始时间:%v  结束时间:%v 比分: %v : %v  ]", GameModes[strconv.Itoa(bs[0].GameQueueId)], startTime, endTime, bd.TeamDetails[0].TotalKills, bd.TeamDetails[1].TotalKills)
	if bd.WasEarlySurrender == 1 {
		//提前投降
		title += " 提前投降"
	}
	ms = append(ms, models.MessageChain{Type: "Plain", Text: title})

	team100 := make([]models.PlayerDetail, 0)
	team200 := make([]models.PlayerDetail, 0)
	//规整队伍
	for _, v := range bd.PlayerDetails {
		if v.TeamId == "100" {
			team100 = append(team100, v)
		} else {
			team200 = append(team200, v)
		}
	}

	for _, v := range bd.TeamDetails {
		//显示队伍头信息,kda 金钱  elo
		IsSurrender := ""
		if v.IsSurrender == 1 {
			if v.Win == "Fail" {
				IsSurrender += "\n投降\n*****"
			}
		}
		title = fmt.Sprintf("\n\n*****************************\n  %v %v/%v/%v %v 队伍平均elo隐藏分:%v  \n*****************************%v", GameTeamWin[v.Win], v.TotalKills, v.TotalDeaths, v.TotalAssists, v.TotalGoldEarned, v.TeamElo, IsSurrender)

		ms = append(ms, models.MessageChain{Type: "Plain", Text: title})
		if v.TeamId == "100" {
			//显示100队伍
			for _, play := range team100 {
				name, _ := url.QueryUnescape(play.Name)
				Champion, has := Champions[play.ChampionId]
				ChampionStr := ""
				if has {
					ChampionStr = Champion.SearchString
				} else {
					ChampionStr = Champion.ChampionId
				}
				l := models.GameLevel{}
				l.ToStruct(play.BattleHonour.GameLevel)
				text := fmt.Sprintf("\n\n [ %v ] %v %v %v/%v/%v 评分:%.2f", TransformGameLevel(l), name, ChampionStr, play.ChampionsKilled, play.NumDeaths, play.Assists, float64(play.GameScore)/10000)
				if play.WasAfk == 1 {
					text += " [跑路]"
				}
				if play.BattleHonour.IsMvp == 1 {
					text += " [mvp]"
				}
				if play.BattleHonour.IsSvp == 1 {
					text += " [svp]"
				}
				if play.BattleHonour.IsPentaKills == 1 {
					text += " [五杀]"
				}
				ms = append(ms, models.MessageChain{Type: "Plain", Text: text})
			}

		} else {
			//显示200队伍
			for _, play := range team200 {
				name, _ := url.QueryUnescape(play.Name)
				Champion, has := Champions[play.ChampionId]
				ChampionStr := ""
				if has {
					ChampionStr = Champion.SearchString
				} else {
					ChampionStr = Champion.ChampionId
				}
				l := models.GameLevel{}
				l.ToStruct(play.BattleHonour.GameLevel)
				text := fmt.Sprintf("\n\n [ %v ] %v %v %v/%v/%v 评分:%.2f", TransformGameLevel(l), name, ChampionStr, play.ChampionsKilled, play.NumDeaths, play.Assists, float64(play.GameScore)/10000)
				if play.WasAfk == 1 {
					text += " [跑路]"
				}
				if play.BattleHonour.IsMvp == 1 {
					text += " [mvp]"
				}
				if play.BattleHonour.IsSvp == 1 {
					text += " [svp]"
				}
				if play.BattleHonour.IsPentaKills == 1 {
					text += " [五杀]"
				}
				ms = append(ms, models.MessageChain{Type: "Plain", Text: text})
			}
		}
	}
	if len(ms) == 1 {
		LOLRoseNotBattle(h)
	} else {
		h.client.SendGroupMessage(h.Gid, ms)
	}
}

// LOLGameList 获取战绩信息,战绩列表
func LOLGameList(h *WsHandler) {
	//根据qq号获取游戏id
	user := models.LOLUser{
		Base: models.Base{
			ID: h.sendId,
		},
	}
	err := h.Ds.Common().GetByID(h.sendId, &user)
	if err == gorm.ErrRecordNotFound {
		//未绑定
		LOLRoseNotBind(h)
		return
	}
	bs := LOLGetBattleListById(h, user.OpenId, "9")
	ms := make([]models.MessageChain, 0)
	ms = append(ms, models.MessageChain{Type: "At", Target: h.sendId})
	for k, v := range bs {
		if k == 8 {
			break
		}
		//调整回显信息,段位,英雄,模式,胜负,战绩,评分,mvp
		Champion, has := Champions[v.ChampionId]
		ChampionStr := ""
		if has {
			ChampionStr = Champion.SearchString
		} else {
			ChampionStr = Champion.ChampionId
		}
		l := models.GameLevel{}
		l.ToStruct(v.GameLevel)
		level := TransformGameLevel(l)
		if k != len(bs)-1 {
			if bs[k].GameQueueId == bs[k+1].GameQueueId {
				l2 := models.GameLevel{}
				l2.ToStruct(bs[k+1].GameLevel)
				p := GetRanksPoints(l) - GetRanksPoints(l2)
				if p >= 0 && p < 100 {
					level += "+" + strconv.Itoa(p)
				} else if p < 0 {
					level += strconv.Itoa(p)
				}
			}
		}
		if v.GameQueueId != 420 && v.GameQueueId != 440 {
			level = ""
		}
		text := fmt.Sprintf("\n\n%v. %v %v %v %v %v/%v/%v 评分:%.2f", k+1, GameWin[v.Win], level, ChampionStr, GameModes[strconv.Itoa(v.GameQueueId)], v.Kills, v.Deaths, v.Assists, float64(v.GameScore)/10000)
		if v.WasMvp == 1 {
			text += " mvp"
		}
		if v.WasSvp == 1 {
			text += " svp"
		}
		if v.WasAfk == 1 {
			text += " 跑路"
		}
		if v.WasSurrender == 1 {
			if v.Win == "Win" {
				text += " 对方投降"
			} else {
				text += " 己方投降"
			}
		}
		ms = append(ms, models.MessageChain{
			Type: "Plain",
			Text: text,
		})
	}
	if len(ms) == 1 {
		LOLRoseNotBattle(h)
	} else {
		h.client.SendGroupMessage(h.Gid, ms)
	}
}

//绑定lol
//lol绑定#屠天杀地之爹王#艾欧尼亚

func LOLBind(h *WsHandler) {
	//获取用户名
	if len(h.resp.Data.MessageChain) < 1 {
		return
	}
	cm := h.resp.Data.MessageChain[1].Text
	//去格式化
	cms := strings.Split(cm, "#")
	if len(cms) != 3 {
		return
	}
	//获取id
	area := LOLAreas[cms[2]]
	id := LOLGetId(h, cms[1], area)
	if id == "" {
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 查无此id"))
		return
	}
	user := models.LOLUser{
		Base: models.Base{
			ID: h.sendId,
		},
	}
	err := h.Ds.Common().GetByID(h.sendId, &user)
	user.Gid = h.Gid
	user.OpenId = id
	user.Name = cms[1]
	user.Area = area
	if err == gorm.ErrRecordNotFound {
		err = h.Ds.Common().Create(&user)
		h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 绑定成功"))
		return
	}

	/*err = h.Ds.Common().Update(nil, &user)
	if err != nil {
		fmt.Println(err)
		return
	}*/
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 一个qq号只能绑定一次"))
}

func LOLGetBattleListById(h *WsHandler, id string, acount string) []models.LOLBattle {
	if id == "" {
		return nil
	}
	rb := fmt.Sprintf(`{"account_type":2,"area":1,"id":"%v","count":%v,"filter":"","offset":0,"from_src":"lol_helper"}`, id, acount)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       h.appConfig.LOLAuth,
		"Referer":      h.appConfig.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.appConfig.LOLGetBattleListUrl)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	fmt.Println(string(body))
	battlesData := gjson.GetBytes(body, "battles").String()
	b := models.LOLBattle{}
	return b.ToBattles([]byte(battlesData))
}

func LOLGetBattleByGameId(h *WsHandler, id, gameId string) *models.BattleDetail {
	if id == "" {
		return nil
	}
	rb := fmt.Sprintf(`{"account_type":2,"area":1,"id":"%v","game_id":"%v","from_src":"lol_helper"}`, id, gameId)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       h.appConfig.LOLAuth,
		"Referer":      h.appConfig.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.appConfig.LOLGetBattleDetailUrl)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	fmt.Println(string(body))
	battlesData := gjson.GetBytes(body, "battle_detail").String()
	bd := models.BattleDetail{}
	bd.ToStruct([]byte(battlesData))
	return &bd
}

func LOLGetId(h *WsHandler, name string, area int64) string {
	if name == "" || area == 0 {
		return ""
	}
	rb := fmt.Sprintf(`{"nickname":"%v","from_src":"lol_helper"}`, name)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       h.appConfig.LOLAuth,
		"Referer":      h.appConfig.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.appConfig.LOLSearchPlayerUrl)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	fmt.Println(string(body))
	plays := gjson.GetBytes(body, "players").Array()
	for _, v := range plays {
		if v.Get("area").Int() == area {
			return v.Get("openid").String()
		}
	}
	return ""
}

var GameWin = map[string]string{
	"Win":  "胜利",
	"Fail": "失败",
}

var GameTeamWin = map[string]string{
	"Win":  "胜方",
	"Fail": "败方",
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

var LOLAreas = map[string]int64{
	"艾欧尼亚":  1,
	"比尔吉沃特": 2,
	"祖安":    3,
	"诺克萨斯":  4,
	"班德尔城":  5,
	"德玛西亚":  6,
	"皮尔特沃夫": 7,
	"战争学院":  8,
	"弗雷尔卓德": 9,
	"巨神峰":   10,
	"雷瑟守备":  11,
	"无畏先锋":  12,
	"裁决之地":  13,
	"黑色玫瑰":  14,
	"暗影岛":   15,
	"恕瑞玛":   16,
	"钢铁烈阳":  17,
	"水晶之痕":  18,
	"均衡教派":  19,
	"扭曲丛林":  20,
	"教育网专区": 21,
	"影流":    22,
	"征服之海":  24,
	"卡拉曼达":  25,
	"巨龙之巢":  26,
	"男爵领域":  30,
}

var Champions = map[int64]models.LOLChampSearch{
	1: {
		ChampionId:   "1",
		SearchString: "黑暗之女",
	},
	2: {
		ChampionId:   "2",
		SearchString: "奥拉夫",
	},
	3: {
		ChampionId:   "3",
		SearchString: "加里奥",
	},
	4: {
		ChampionId:   "4",
		SearchString: "卡牌",
	},
	5: {
		ChampionId:   "5",
		SearchString: "赵信",
	},
	6: {
		ChampionId:   "6",
		SearchString: "厄加特",
	},
	7: {
		ChampionId:   "7",
		SearchString: "妖姬",
	},
	8: {
		ChampionId:   "8",
		SearchString: "猩红收割者",
	},
	9: {
		ChampionId:   "9",
		SearchString: "末日",
	},
	10: {
		ChampionId:   "10",
		SearchString: "天使",
	},
	11: {
		ChampionId:   "11",
		SearchString: "剑圣",
	},
	12: {
		ChampionId:   "12",
		SearchString: "牛头",
	},
	13: {
		ChampionId:   "13",
		SearchString: "流浪",
	},
	14: {
		ChampionId:   "14",
		SearchString: "老司机",
	},
	15: {
		ChampionId:   "15",
		SearchString: "希维尔",
	},
	16: {
		ChampionId:   "16",
		SearchString: "索拉卡",
	},
	17: {
		ChampionId:   "17",
		SearchString: "提莫",
	},
	18: {
		ChampionId:   "18",
		SearchString: "崔丝塔娜",
	},
	19: {
		ChampionId:   "19",
		SearchString: "狼人",
	},
	20: {
		ChampionId:   "20",
		SearchString: "雪人",
	},
	21: {
		ChampionId:   "21",
		SearchString: "赏金",
	},
	22: {
		ChampionId:   "22",
		SearchString: "寒冰",
	},
	23: {
		ChampionId:   "23",
		SearchString: "蛮王",
	},
	24: {
		ChampionId:   "24",
		SearchString: "武器",
	},
	25: {
		ChampionId:   "25",
		SearchString: "莫甘娜",
	},
	26: {
		ChampionId:   "26",
		SearchString: "时光",
	},
	27: {
		ChampionId:   "27",
		SearchString: "炼金",
	},
	28: {
		ChampionId:   "28",
		SearchString: "寡妇",
	},
	29: {
		ChampionId:   "29",
		SearchString: "老鼠",
	},
	30: {
		ChampionId:   "30",
		SearchString: "死歌",
	},
	31: {
		ChampionId:   "31",
		SearchString: "虚空恐惧",
	},
	32: {
		ChampionId:   "32",
		SearchString: "阿木木",
	},
	33: {
		ChampionId:   "33",
		SearchString: "龙龟",
	},
	34: {
		ChampionId:   "34",
		SearchString: "凤凰",
	},
	35: {
		ChampionId:   "35",
		SearchString: "小丑",
	},
	36: {
		ChampionId:   "36",
		SearchString: "蒙多",
	},
	37: {
		ChampionId:   "37",
		SearchString: "琴女",
	},
	38: {
		ChampionId:   "38",
		SearchString: "卡萨丁",
	},
	39: {
		ChampionId:   "39",
		SearchString: "刀妹",
	},
	40: {
		ChampionId:   "40",
		SearchString: "风女",
	},
	41: {
		ChampionId:   "41",
		SearchString: "船长",
	},
	42: {
		ChampionId:   "42",
		SearchString: "飞机",
	},
	43: {
		ChampionId:   "43",
		SearchString: "卡尔玛",
	},
	44: {
		ChampionId:   "44",
		SearchString: "宝石",
	},
	45: {
		ChampionId:   "45",
		SearchString: "小法",
	},
	48: {
		ChampionId:   "48",
		SearchString: "巨魔",
	},
	50: {
		ChampionId:   "50",
		SearchString: "乌鸦",
	},
	51: {
		ChampionId:   "51",
		SearchString: "女警",
	},
	53: {
		ChampionId:   "53",
		SearchString: "机器人",
	},
	54: {
		ChampionId:   "54",
		SearchString: "墨菲特",
	},
	55: {
		ChampionId:   "55",
		SearchString: "卡特琳娜",
	},
	56: {
		ChampionId:   "56",
		SearchString: "梦魇",
	},
	57: {
		ChampionId:   "57",
		SearchString: "茂凯",
	},
	58: {
		ChampionId:   "58",
		SearchString: "鳄鱼",
	},
	59: {
		ChampionId:   "59",
		SearchString: "皇子",
	},
	60: {
		ChampionId:   "60",
		SearchString: "蜘蛛",
	},
	61: {
		ChampionId:   "61",
		SearchString: "发条",
	},
	62: {
		ChampionId:   "62",
		SearchString: "孙悟空",
	},
	63: {
		ChampionId:   "63",
		SearchString: "火男",
	},
	64: {
		ChampionId:   "64",
		SearchString: "盲僧",
	},
	67: {
		ChampionId:   "67",
		SearchString: "vn",
	},
	68: {
		ChampionId:   "68",
		SearchString: "兰博",
	},
	69: {
		ChampionId:   "69",
		SearchString: "魔蛇",
	},
	72: {
		ChampionId:   "72",
		SearchString: "水晶先锋",
	},
	74: {
		ChampionId:   "74",
		SearchString: "大发明家",
	},
	75: {
		ChampionId:   "75",
		SearchString: "狗头",
	},
	76: {
		ChampionId:   "76",
		SearchString: "奈德丽",
	},
	77: {
		ChampionId:   "77",
		SearchString: "乌迪尔",
	},
	78: {
		ChampionId:   "78",
		SearchString: "波比",
	},
	79: {
		ChampionId:   "79",
		SearchString: "酒桶",
	},
	80: {
		ChampionId:   "80",
		SearchString: "潘森",
	},
	81: {
		ChampionId:   "81",
		SearchString: "伊泽瑞尔",
	},
	82: {
		ChampionId:   "82",
		SearchString: "莫德凯撒",
	},
	83: {
		ChampionId:   "83",
		SearchString: "约里克",
	},
	84: {
		ChampionId:   "84",
		SearchString: "阿卡丽",
	},
	85: {
		ChampionId:   "85",
		SearchString: "凯南",
	},
	86: {
		ChampionId:   "86",
		SearchString: "盖伦",
	},
	89: {
		ChampionId:   "89",
		SearchString: "蕾欧娜",
	},
	90: {
		ChampionId:   "90",
		SearchString: "玛尔扎哈",
	},
	91: {
		ChampionId:   "91",
		SearchString: "男刀",
	},
	92: {
		ChampionId:   "92",
		SearchString: "锐雯",
	},
	96: {
		ChampionId:   "96",
		SearchString: "深渊巨口·克格莫",
	},
	98: {
		ChampionId:   "98",
		SearchString: "慎",
	},
	99: {
		ChampionId:   "99",
		SearchString: "拉克丝",
	},
	101: {
		ChampionId:   "101",
		SearchString: "泽拉斯",
	},
	102: {
		ChampionId:   "102",
		SearchString: "龙女",
	},
	103: {
		ChampionId:   "103",
		SearchString: "阿狸",
	},
	104: {
		ChampionId:   "104",
		SearchString: "男枪",
	},
	105: {
		ChampionId:   "105",
		SearchString: "小鱼",
	},
	106: {
		ChampionId:   "106",
		SearchString: "狗熊",
	},
	107: {
		ChampionId:   "107",
		SearchString: "傲之追猎者",
	},
	110: {
		ChampionId:   "110",
		SearchString: "韦鲁斯",
	},
	111: {
		ChampionId:   "111",
		SearchString: "泰坦",
	},
	112: {
		ChampionId:   "112",
		SearchString: "维克托",
	},
	113: {
		ChampionId:   "113",
		SearchString: "瑟庄妮",
	},
	114: {
		ChampionId:   "114",
		SearchString: "剑姬",
	},
	115: {
		ChampionId:   "115",
		SearchString: "炸弹人",
	},
	117: {
		ChampionId:   "117",
		SearchString: "璐璐",
	},
	119: {
		ChampionId:   "119",
		SearchString: "德莱文",
	},
	120: {
		ChampionId:   "120",
		SearchString: "人马",
	},
	121: {
		ChampionId:   "121",
		SearchString: "螳螂",
	},
	122: {
		ChampionId:   "122",
		SearchString: "诺手",
	},
	126: {
		ChampionId:   "126",
		SearchString: "杰斯",
	},
	127: {
		ChampionId:   "127",
		SearchString: "丽桑卓",
	},
	131: {
		ChampionId:   "131",
		SearchString: "皎月",
	},
	133: {
		ChampionId:   "133",
		SearchString: "德玛西亚之翼·奎因",
	},
	134: {
		ChampionId:   "134",
		SearchString: "辛德拉",
	},
	143: {
		ChampionId:   "143",
		SearchString: "婕拉",
	},
	150: {
		ChampionId:   "150",
		SearchString: "纳尔",
	},
	154: {
		ChampionId:   "154",
		SearchString: "扎克",
	},
	157: {
		ChampionId:   "157",
		SearchString: "亚索",
	},
	161: {
		ChampionId:   "161",
		SearchString: "虚空之眼·维克兹",
	},
	201: {
		ChampionId:   "201",
		SearchString: "弗雷尔卓德之心",
	},
	203: {
		ChampionId:   "203",
		SearchString: "千珏",
	},
	222: {
		ChampionId:   "222",
		SearchString: "金克丝",
	},
	223: {
		ChampionId:   "223",
		SearchString: "塔姆",
	},
	236: {
		ChampionId:   "236",
		SearchString: "卢锡安",
	},
	238: {
		ChampionId:   "238",
		SearchString: "劫",
	},
	245: {
		ChampionId:   "245",
		SearchString: "艾克",
	},
	254: {
		ChampionId:   "254",
		SearchString: "蔚",
	},
	266: {
		ChampionId:   "266",
		SearchString: "亚托克斯",
	},
	267: {
		ChampionId:   "267",
		SearchString: "娜美",
	},
	268: {
		ChampionId:   "268",
		SearchString: "伊泽瑞尔",
	},
	412: {
		ChampionId:   "412",
		SearchString: "锤石",
	},
	420: {
		ChampionId:   "420",
		SearchString: "俄洛伊",
	},
	421: {
		ChampionId:   "421",
		SearchString: "挖掘机",
	},
	429: {
		ChampionId:   "429",
		SearchString: "卡莉丝塔",
	},
	432: {
		ChampionId:   "432",
		SearchString: "巴德",
	},
	202: {
		ChampionId:   "202",
		SearchString: "烬",
	},
	136: {
		ChampionId:   "136",
		SearchString: "龙王",
	},
	163: {
		ChampionId:   "163",
		SearchString: "岩雀",
	},
	240: {
		ChampionId:   "240",
		SearchString: "克烈",
	},
	427: {
		ChampionId:   "427",
		SearchString: "艾翁",
	},
	164: {
		ChampionId:   "164",
		SearchString: "青钢影",
	},
	497: {
		ChampionId:   "497",
		SearchString: "洛",
	},
	498: {
		ChampionId:   "498",
		SearchString: "霞",
	},
	141: {
		ChampionId:   "141",
		SearchString: "凯隐",
	},
	516: {
		ChampionId:   "516",
		SearchString: "奥恩",
	},
	555: {
		ChampionId:   "555",
		SearchString: "派克",
	},
	777: {
		ChampionId:   "777",
		SearchString: "永恩",
	},
	360: {
		ChampionId:   "360",
		SearchString: "莎弥拉",
	},
	875: {
		ChampionId:   "875",
		SearchString: "腕豪",
	},
	145: {
		ChampionId:   "145",
		SearchString: "卡莎",
	},
	235: {
		ChampionId:   "235",
		SearchString: "赛娜",
	},
	221: {
		ChampionId:   "221",
		SearchString: "泽丽",
	},
	887: {
		ChampionId:   "887",
		SearchString: "格温",
	},
	350: {
		ChampionId:   "350",
		SearchString: "猫咪",
	},
	876: {
		ChampionId:   "350",
		SearchString: "莉莉娅",
	},
	517: {
		ChampionId:   "517",
		SearchString: "塞拉斯",
	},
	166: {
		ChampionId:   "166",
		SearchString: "阿克尚",
	},
	523: {
		ChampionId:   "523",
		SearchString: "厄斐琉斯",
	},
	897: {
		ChampionId:   "897",
		SearchString: "奎桑提",
	},
	234: {
		ChampionId:   "234",
		SearchString: "佛耶戈",
	},
	200: {
		ChampionId:   "200",
		SearchString: "虚空女皇",
	},
}

//根据game level获取段位信息

func TransformGameLevel(level models.GameLevel) string {
	return LOLTier[level.Tier] + LOLRank[level.Rank] + level.LeaguePoints + "点"
}

var LOLTier = map[string]string{
	"1": "钻石",
	"2": "铂金",
	"3": "黄金",
	"4": "青铜",
	"5": "黑铁",
	"6": "大师",
}

var LOLRank = map[string]string{
	"0": "一",
	"1": "二",
	"2": "三",
	"3": "四",
}

//获取段位的点数

func GetRanksPoints(level models.GameLevel) int {
	r, err := strconv.Atoi(level.Rank)
	p, err := strconv.Atoi(level.LeaguePoints)
	if err != nil {
		return 0
	}
	switch {
	case level.Tier == "5":
		return (3-r)*100 + p
	case level.Tier == "4":
		return (3-r)*100 + 100*4 + p
	case level.Tier == "3":
		return (3-r)*100 + 100*8 + p
	case level.Tier == "2":
		return (3-r)*100 + 100*12 + p
	case level.Tier == "1":
		return (3-r)*100 + 100*16 + p
	case level.Tier == "6":
		return (3-r)*100 + 100*20 + p
	case level.Tier == "7":
		return (3-r)*100 + 100*24 + p
	}
	return 0
}
