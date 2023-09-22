package handlers

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"gorm.io/gorm"
	"io"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/global/errnos"
	"kiingma/cmd/chatgpt/middleware/jwt"
	"kiingma/cmd/chatgpt/models"
	"kiingma/pkg/appconfig"
	"log"
	"regexp"
	"strings"
)

type LOLHandler struct {
	ds     datastore.DataStore
	config *appconfig.Config
	uih    *UserIntegrateHandler
	userId uint64
}

func NewLOLHandler(ds datastore.DataStore, config *appconfig.Config, uih *UserIntegrateHandler) *LOLHandler {
	return &LOLHandler{
		ds:     ds,
		config: config,
		uih:    uih,
	}
}

func (h *LOLHandler) Handle(c *gin.Context, body []byte) {
	val, ex := c.Get("token")
	if !ex {
		errnos.ErrorTokenAuthFail(c)
		return
	}
	token := val.(jwt.CustomClaims)
	h.userId = token.UserId
	//获取最后一条消息
	messages := gjson.Get(string(body), "messages").Array()
	if len(messages) == 0 {
		errnos.Fail(c)
		return
	}
	msg := messages[len(messages)-1].Get("content").String()
	switch {
	case msg == "隐藏分":
		chanStream := make(chan string, 10)
		defer func() {
			close(chanStream)
		}()
		go h.GetEloByUserId(chanStream)
		data := errnos.Data{}
		c.Stream(func(w io.Writer) bool {
			select {
			case msg := <-chanStream:
				if msg == "<!finish>" {
					c.SSEvent("stop", "[DONE]")
					return false
				}
				data.Msg = msg
				c.SSEvent("message", data)
				return true
			}
		})
	case msg == "lol绑定":
		errnos.Success(c, ` 请输入[ "您的游戏名称#服务器名称" ]进行绑定`)
	case regexp.MustCompile(`.*?#.*`).MatchString(msg):
		ok, err := h.LOLBind(msg)
		data := errnos.Data{}
		if ok {
			c.Stream(func(w io.Writer) bool {
				data.Msg = "绑定成功"
				c.SSEvent("message", data)
				c.SSEvent("stop", "[DONE]")
				return false
			})
		} else {
			errnos.Success(c, "绑定失败 + "+err.Error())
		}
	default:
		data := errnos.Data{}
		c.Stream(func(w io.Writer) bool {
			data.Msg = `
### 您可以使用以下指令进行操作:
- 绑定你的英雄联盟账号请输入: "**您的游戏名称#服务器名称**" 
- 查询您的隐藏分请输入: "**隐藏分**"
			`
			c.SSEvent("message", data)
			c.SSEvent("stop", "[DONE]")
			return false
		})
	}
}

//获取单双排隐藏分

func (h *LOLHandler) LOLBind(msg string) (bool, error) {
	//去空格
	msg = strings.TrimSpace(msg)
	//去\n
	msg = strings.ReplaceAll(msg, "\n", "")
	//去格式化
	cms := strings.Split(msg, "#")
	if len(cms) != 2 {
		return false, errnos.ErrInvalid
	}
	//获取id
	area := LOLAreas[cms[1]]
	if area == 0 {
		return false, errnos.ErrGameArea
	}
	id, err := h.LOLGetId(cms[0], area)
	if id == "" {
		return false, errnos.ErrIdNotFound
	}
	user := models.LOLUser{}
	user.UserId = h.userId
	err = h.ds.Common().GetFirst(&user)
	user.OpenId = id
	user.Name = cms[0]
	user.Area = area
	if err == gorm.ErrRecordNotFound {
		err = h.ds.Common().Create(&user)
		err = nil
	} else {
		err = h.ds.Common().Update(nil, &user)
	}
	return true, err
}

func (h *LOLHandler) GetEloByUserId(chanStream chan string) {
	defer func() {
		if err := recover(); err != nil {
			log.Println(err)
		}
	}()
	user := models.LOLUser{}
	user.UserId = h.userId
	err := h.ds.Common().GetFirst(&user)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			chanStream <- errnos.ErrIdNotBind.Error()
			chanStream <- "<!finish>"
			return
		}
	}
	ui := models.UserIntegrate{}
	ui.UserID = h.userId
	err = h.ds.Common().GetFirst(&ui)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			chanStream <- errnos.ErrorsNoAuthorization
			chanStream <- "<!finish>"
			return
		}
		fmt.Println(err.Error())
		chanStream <- "<!finish>"
		return
	}
	if ui.Amount <= 0 {
		chanStream <- errnos.BuildErrorInsufficientBalanceMsg(ui.ExternalID)
		chanStream <- "<!finish>"
		return
	}
	//获取到最后一把单双排
	bsp, err := h.LOLGetBattleListById(user, "1", models.LOLRankGame)
	var bs []models.LOLBattle

	if bsp != nil {
		bs = *bsp
	}
	if err != nil {
		if err.Error() == "WG_COMM_ERR_USER_CONFIG_LIMIT" {
			chanStream <- errnos.ErrUserConfigLimit.Error()
			chanStream <- "<!finish>"
			return
		}
	}
	chanStream <- fmt.Sprintf("## 游戏ID : %v\n", user.Name)
	chanStream <- fmt.Sprintf("| 游戏类型 | 隐藏分 |\n| :------- | ------: |\n")

	if len(bs) == 0 {
		chanStream <- fmt.Sprintf("| 单双排 | %v |\n", errnos.ErrNoGames.Error())
	} else {
		gameId := bs[0].GameId
		bd := h.LOLGetBattleByGameId(user, gameId)
		team := bd.GetTeamDetailById(bs[0].TeamId)
		chanStream <- fmt.Sprintf("| 单双排 | %v分 |\n", team.TeamElo)
	}
	//获取到最后一把灵活组排
	bsp, err = h.LOLGetBattleListById(user, "1", models.LOLTeamGame)
	bs = *bsp
	if len(bs) == 0 {
		chanStream <- fmt.Sprintf("| 灵活组排 | %v |\n", errnos.ErrNoGames.Error())
	} else {
		gameId := bs[0].GameId
		bd := h.LOLGetBattleByGameId(user, gameId)
		team := bd.GetTeamDetailById(bs[0].TeamId)
		chanStream <- fmt.Sprintf("| 灵活组排 | %v分 |\n", team.TeamElo)
	}
	//获取最后一把匹配
	bsp, err = h.LOLGetBattleListById(user, "1", models.LOLMatchGame)
	bs = *bsp
	if len(bs) == 0 {
		chanStream <- fmt.Sprintf("| 匹配 | %v |\n", errnos.ErrNoGames.Error())
	} else {
		gameId := bs[0].GameId
		bd := h.LOLGetBattleByGameId(user, gameId)
		team := bd.GetTeamDetailById(bs[0].TeamId)
		chanStream <- fmt.Sprintf("| 匹配 | %v分 |\n", team.TeamElo)
	}
	//获取最后一把大乱斗
	bsp, err = h.LOLGetBattleListById(user, "1", models.LOLAramGame)
	bs = *bsp
	if len(bs) == 0 {
		chanStream <- fmt.Sprintf("| 大乱斗 | %v |\n", errnos.ErrNoGames.Error())
	} else {
		gameId := bs[0].GameId
		bd := h.LOLGetBattleByGameId(user, gameId)
		team := bd.GetTeamDetailById(bs[0].TeamId)
		chanStream <- fmt.Sprintf("| 大乱斗 | %v分 |\n", team.TeamElo)
	}
	chanStream <- "\n***注意:隐藏分根据您最新的游戏数据所得,其中以您独自进行游戏为最准确值,如若您组队进行游戏,则有可能得到的是您与您开黑的好友平均隐藏分***"
	chanStream <- "<!finish>"
	//扣除两百分
	err = h.uih.DeductFee(ui, 200)
	if err != nil {
		fmt.Println(err)
		return
	}
}

//从LOLBattle获取到指定玩家的信息

//获取战绩列表

func (h *LOLHandler) LOLGetBattleListById(user models.LOLUser, count, gameType string) (*[]models.LOLBattle, error) {
	cookie := user.Cookie
	if cookie == "" {
		adminUser := models.LOLUser{}
		_ = h.ds.Common().GetByID(h.config.LOLAdminId, &adminUser)
		cookie = adminUser.Cookie
	}
	rb := fmt.Sprintf(`{"account_type":2,"area":%v,"id":"%v","count":%v,"filter":"%v","offset":0,"from_src":"lol_helper"}`, user.Area, user.OpenId, count, gameType)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       cookie,
		"Referer":      h.config.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.config.LOLGetBattleListUrl)
	if err != nil {
		fmt.Println(err)
		return nil, nil
	}
	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return nil, nil
	}
	fmt.Println(string(body))
	if gjson.GetBytes(body, "result.error_message").String() == "WG_COMM_ERR_USER_CONFIG_LIMIT" {
		return nil, errors.New("WG_COMM_ERR_USER_CONFIG_LIMIT")
	}
	battlesData := gjson.GetBytes(body, "battles").String()
	b := models.LOLBattle{}
	bs := b.ToBattles([]byte(battlesData))
	return &bs, nil
}

//获取游戏openid

func (h *LOLHandler) LOLGetId(name string, area int64) (string, error) {
	fmt.Println("getid --------"+name, "++++", area)

	if name == "" || area == 0 {
		return "", nil
	}
	//用管理员的id去查
	user := models.LOLUser{}
	err := h.ds.Common().GetByID(h.config.LOLAdminId, &user)
	fmt.Println("admin --------", user)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	rb := fmt.Sprintf(`{"nickname":"%v","from_src":"lol_helper"}`, name)
	fmt.Println("rb --------" + rb)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       user.Cookie,
		"Referer":      h.config.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.config.LOLSearchPlayerUrl)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	fmt.Println(string(body))
	if gjson.GetBytes(body, "result.error_code").String() == "8000102" {
		return "", errors.New("")
	}
	plays := gjson.GetBytes(body, "players").Array()
	for _, v := range plays {
		if v.Get("area").Int() == area {
			return v.Get("openid").String(), nil
		}
	}
	return "", err
}

//获取对局信息

func (h *LOLHandler) LOLGetBattleByGameId(user models.LOLUser, gameId string) *models.BattleDetail {
	cookie := user.Cookie
	if cookie == "" {
		adminUser := models.LOLUser{}
		_ = h.ds.Common().GetByID(h.config.LOLAdminId, &adminUser)
		cookie = adminUser.Cookie
	}
	rb := fmt.Sprintf(`{"account_type":2,"area":%v,"id":"%v","game_id":"%v","from_src":"lol_helper"}`, user.Area, user.OpenId, gameId)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       cookie,
		"Referer":      h.config.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.config.LOLGetBattleDetailUrl)
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

//根据game level获取段位信息

func TransformGameLevel(level models.GameLevel) string {
	if level.Tier == "" {
		return ""
	}
	return LOLTier[level.Tier] + LOLRank[level.Rank] + level.LeaguePoints + "点"
}

var LOLTier = map[string]string{
	"1": "钻石",
	"2": "铂金",
	"3": "黄金",
	"4": "白银",
	"5": "青铜",
	"6": "大师",
	"7": "王者",
	"8": "黑铁",
}

var LOLRank = map[string]string{
	"0": "一",
	"1": "二",
	"2": "三",
	"3": "四",
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
		SearchString: "吸血鬼",
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
		SearchString: "EZ",
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
		SearchString: "大嘴",
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
		SearchString: "狮子狗",
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
		SearchString: "鸟人",
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
		SearchString: "大眼",
	},
	201: {
		ChampionId:   "201",
		SearchString: "布隆",
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
		SearchString: "剑魔",
	},
	267: {
		ChampionId:   "267",
		SearchString: "娜美",
	},
	268: {
		ChampionId:   "268",
		SearchString: "黄鸡",
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
