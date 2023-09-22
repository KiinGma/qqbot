package handler

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/tidwall/gjson"
	"kiingma/cmd/datastore"
	"kiingma/cmd/qqbot/models"
	"kiingma/cmd/qqbot/wsclient"
	"kiingma/pkg/appconfig"
	"kiingma/pkg/ws_pkg"
	"regexp"
	"strconv"
	"strings"
)

var SessionTypeMap map[uint64]int

type WsHandler struct {
	AppConfig      *appconfig.Config
	client         *wsclient.Client
	Hub            *ws_pkg.WSHub
	AtMeSessionMap map[string]AtMeSession
	Gid            uint64
	sendId         uint64
	GroupKey       string
	resp           *models.RespMessage
	Ds             datastore.DataStore
}

type AtMeSession struct {
	Id      uint64
	GroupId uint64
}

func NewWsClient(config *appconfig.Config, c *wsclient.Client, ds datastore.DataStore, hub *ws_pkg.WSHub) *WsHandler {
	return &WsHandler{
		Hub:            hub,
		AppConfig:      config,
		client:         c,
		AtMeSessionMap: make(map[string]AtMeSession),
		Ds:             ds,
	}
}

func (h *WsHandler) ReadMessage() {
	for {
		select {
		case m := <-h.client.Read:
			resp := models.RespMessage{}
			resp.ToRespMessage(m)
			h.sendId = resp.Data.Sender.Id
			if resp.SyncId != "" && resp.SyncId != "0" {
				h.resp = &resp
				h.Gid = resp.Data.Sender.Group.Id
				key := strconv.FormatUint(h.sendId, 10) + "_" + strconv.FormatUint(h.Gid, 10)
				h.GroupKey = key
				messageType := gjson.GetBytes(m, "data.type").String()
				switch messageType {
				/*case "GroupRecallEvent":
				h.GroupRecallEvent(m)*/
				case "GroupMessage":
					h.GroupHandler()
				case "FriendMessage", "TempMessage":
					h.FriendHandler()
				default:
					session := gjson.GetBytes(m, "data.session").String()
					if session != "" {
						h.client.Session = session
					}
				}
			}
		}
	}
}
func (h *WsHandler) FriendHandler() {
	//做一次私信转发
	go h.Transmit(*h.resp)

	session, has := SessionTypeMap[h.sendId]
	if has {
		if session == 4 {
		} else if session == 5 {
			YuanShenBind(h)
		}
		return
	}
	go ChatGpt(*h)
}

func (h *WsHandler) Test(c echo.Context) error {

	return nil
}

// GroupHandler 群消息管理
func (h *WsHandler) GroupHandler() {
	resp := *h.resp
	//判断是否是at机器人
	if IsAtMe(h) {
		go ChatGpt(*h)
	}
	CommonCommand(h, resp)
	if SessionTypeMap[h.Gid] == 0 {
		for _, v := range resp.Data.MessageChain {
			if v.Type == "Source" {
				continue
			}
			switch v.Type {
			case "Plain":
				switch {
				/*case v.Text == "幸运骰子":
				InitDiceGame(h)*/

				case v.Text == "属性":
					GetCharacterAttribute(h)
				case v.Text == "背包":
					GetPlayBackpack(h)
				case regexp.MustCompile(`^装备\s\S*`).MatchString(v.Text):
					UpEquip(h, v.Text)
				case regexp.MustCompile(`^卸下\s\S*`).MatchString(v.Text):
					DownEquip(h, v.Text)
				case regexp.MustCompile(`^丢弃\s\S*\s[0-9]+$|丢弃\s\S*`).MatchString(v.Text):
					DiscardBackpack(h, v.Text)
				case v.Text == "猜数字" || regexp.MustCompile(`^猜数字\*[0-9]+$`).MatchString(v.Text):
					GuessNumbersGameInit(h, v.Text)
				case v.Text == "21点玩法说明":
					h.Game21()
				case strings.Index(v.Text, "21点") != -1:
					h.Game21()
				//case v.Text == "狼人杀" || regexp.MustCompile(`狼人杀\*[0-9]+`).MatchString(v.Text):
				//	WolfKillInit(h, v.Text)
				case regexp.MustCompile(`^打赏[0-9]*$|^打赏&`).MatchString(v.Text):
					GiveAReward(h, v.Text)
				case v.Text == "转账":
					Transfer(h, *h.resp)
				case v.Text == "打劫" || v.Text == " 打劫":
					h.IntegrateLoot(resp)
				default:
					h.Shop()
					go h.LOL()
					go WeGame(*h)
				}
			}
		}
	} else if SessionTypeMap[h.Gid] == 1 {
		h.Game21()
	} else if SessionTypeMap[h.Gid] == 2 {
		h.WolfKill()
	} else if SessionTypeMap[h.Gid] == 4 {
		h.GuessNumbersGame()
	} else if SessionTypeMap[h.Gid] == 5 {
		h.Dice()
	}
}

func CommonCommand(h *WsHandler, resp models.RespMessage) {
	for _, v := range resp.Data.MessageChain {
		if v.Type == "Source" {
			continue
		}
		switch v.Type {
		case "Plain":
			switch {
			case v.Text == "测试":
			case strings.Index(v.Text, "火车票") != -1:
				h.Trains()
			//case v.Text == "出金概率":
			//	GetGold(h)
			case v.Text == "抽卡分析":
				AnalyseGaChaLog(h)
			case v.Text == "战绩" || regexp.MustCompile(`^战绩\*[0-9]+$`).MatchString(v.Text):
			case v.Text == "禁言":
				h.client.Mute(h.Gid, h.sendId, 10)
			case regexp.MustCompile(`^消息[0-9]+$`).MatchString(v.Text):
				id := strings.ReplaceAll(v.Text, "消息", "")
				parseInt, _ := strconv.ParseInt(id, 10, 64)
				h.client.MessageFromId(parseInt, h.Gid)
			/*case regexp.MustCompile(`-?(\(-?)*\d+(\.\d+)?\)*$|-?((\(-?)*\d+(\.\d+)?\)*[\-/+*])+((\(-?)*\d+(\.\d+)?\)*)`).MatchString(v.Text):
			//计算
			h.Compute(v.Text)*/
			default:
				h.YuanShen(h.Gid, v.Text)
			}
		}
		h.Integrate(h.Gid, h.sendId, v.Text)
		go h.Alipay()
	}
}

// GroupRecallEvent 管理撤回消息
func (h *WsHandler) GroupRecallEvent(msg []byte) {
	id := gjson.GetBytes(msg, "data.group.id").Uint()
	mid := gjson.GetBytes(msg, "data.messageId").String()
	mcs := []models.MessageChain{
		{
			Type: "Plain",
			Text: "检测到撤回消息,Id为: " + mid + ",回复 [消息Id] 获取 ! ,如 \"消息1234\"",
		},
	}
	h.client.SendGroupMessage(id, mcs)
}

// AtMe at 机器人
func (h *WsHandler) AtMe(resp models.RespMessage) {
	for _, v := range resp.Data.MessageChain {
		switch v.Type {
		case "Plain":
			//去空格
			text := strings.ReplaceAll(v.Text, " ", "")
			switch {
			default:
				//脏话判断
				if h.IsCurse(text) {
					h.Curse(h.Gid, h.sendId, text)
				}
			}
		}
	}

}

// CheckMessages 比较两个消息链是否相同
func CheckMessages(last, new []models.MessageChain) bool {
	if len(last) != len(new) {
		return false
	}
	q := false
	for i := 0; i < len(last); i++ {
		if last[i].Type == new[i].Type && last[i].Url == new[i].Url && last[i].Text == new[i].Text {
			q = true
		}
	}
	return q
}

// 判断是否是at机器人

func IsAtMe(h *WsHandler) bool {
	for _, v := range h.resp.Data.MessageChain {
		if v.Type == "At" && v.Target == h.AppConfig.BindQ {
			return true
		}
	}
	return false
}

func (h *WsHandler) Send123(c echo.Context) error {
	message := ws_pkg.Message{
		ID:   c.Param("id"),
		Data: []byte(c.Param("id")),
	}
	h.Hub.Broadcast <- &message
	return nil
}

func (h *WsHandler) Ws(c echo.Context) error {
	//升级协议
	conn, err := ws_pkg.Upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		fmt.Println(err)
		return err
	}
	//注册到内存
	server := &ws_pkg.Server{Hub: h.Hub, Conn: conn, Send: make(chan []byte, 256), ID: c.Param("id")}
	server.Hub.Register <- server
	go server.WritePump()
	go server.ReadPump()
	return nil
}

func (h *WsHandler) Transmit(resp models.RespMessage) {
	data := resp.Data.MessageChain[1].Text
	message := ws_pkg.Message{
		ID:   strconv.FormatUint(resp.Data.Sender.Id, 10),
		Data: []byte(data),
	}
	h.Hub.Broadcast <- &message
}
