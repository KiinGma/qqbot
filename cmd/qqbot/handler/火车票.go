package handler

import (
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	"qqbot/cmd/qqbot/models"
	"qqbot/pkg/appconfig"
	"regexp"
	"strconv"
	"strings"
	"time"
)

func (h *WsHandler) Trains() {
	for _, v := range h.resp.Data.MessageChain {
		switch {
		case v.Text == "i" || v.Text == "开始":
			InitGame(h)
		case strings.Index(v.Text, "火车票") != -1:
			GetTrains(h, v.Text)
		}
	}
}

func GetTrains(h *WsHandler, text string) {
	t, from, to, fromName, toName := TrainsStationFormat(h, text)
	if from == "" || to == "" || fromName == "" || toName == "" {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("指令错误"))
		return
	}
	config := appconfig.LoadCPGConfig()
	resp, err := req.SetHeader("Cookie", config.TrainCookie).Get(fmt.Sprintf("https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=%v&leftTicketDTO.from_station=%v&leftTicketDTO.to_station=%v&purpose_codes=ADULT", t, from, to))
	if err != nil {
		fmt.Println(err)
	}
	body, _ := io.ReadAll(resp.Body)
	result := gjson.GetBytes(body, "data.result").Array()
	mcs := make([]models.MessageChain, len(result))
	for k, v := range result {
		info := strings.Split(v.String(), "|")
		//1: 车次 出发-到达 出发时间-到达时间 用时: 商务座[14] 一等座[14] 二等座[22]
		//判断是否有一等座,有的就是动车
		if info[31] != "" {
			mcs[k] = models.MessageChain{Type: "Plain", Text: fmt.Sprintf("\n%v: %v %v-%v %v-%v 耗时:%v 商务座[%v] 一等座[%v] 二等座[%v] 无座[%v]\n", k+1, info[3], fromName, toName, info[8], info[9], info[10], info[32], info[31], info[30], info[26])}
		} else {
			mcs[k] = models.MessageChain{Type: "Plain", Text: fmt.Sprintf("\n%v: %v %v-%v %v-%v 耗时:%v 软卧[%v] 硬卧[%v] 软座[%v] 硬座[%v] 无座[%v]\n", k+1, info[3], fromName, toName, info[8], info[9], info[10], info[29], info[28], info[27], info[23], info[26])}
		}
	}
	at := make([]models.MessageChain, 2)
	at[0] = models.MessageChain{
		Type:   "At",
		Target: h.sendId,
	}
	at[1] = models.MessageChain{
		Type: "Plain", Text: fmt.Sprintf(" 查询 %v 的火车票信息为:\n", t),
	}
	mcs = append(at, mcs...)
	if len(mcs) > 2 {
		h.client.SendGroupMessage(h.Gid, mcs)
	} else {
		mcs = append(mcs, models.MessageChain{
			Type: "Plain", Text: fmt.Sprintf("\n很抱歉，按您的查询条件，当前未找到从 %v 到 %v 的列车。\n", fromName, toName),
		})
	}
}

func TrainsStationFormat(h *WsHandler, text string) (string, string, string, string, string) {
	//去空格
	text = strings.ReplaceAll(text, " ", "")
	//去宾语和格式名
	text = strings.ReplaceAll(text, "的火车票", "")
	text = strings.ReplaceAll(text, "查询火车票", "")
	text = strings.ReplaceAll(text, "火车票", "")
	text = strings.ReplaceAll(text, "查询", "")

	t := time.Now().Format("2006-01-02")
	from := ""
	to := ""
	//获取时间
	switch {
	case strings.Index(text, "今日") != -1:
		text = strings.ReplaceAll(text, "今日", "")
	case strings.Index(text, "今天") != -1:
		text = strings.ReplaceAll(text, "今天", "")
	case strings.Index(text, "明天") != -1:
		t = time.Now().Add(24 * time.Hour).Format("2006-01-02")
		text = strings.ReplaceAll(text, "明天", "")
	case strings.Index(text, "明日") != -1:
		t = time.Now().Add(24 * time.Hour).Format("2006-01-02")
		text = strings.ReplaceAll(text, "明日", "")
	case strings.Index(text, "后天") != -1:
		t = time.Now().Add(48 * time.Hour).Format("2006-01-02")
		text = strings.ReplaceAll(text, "后天", "")
	case strings.Index(text, "大后天") != -1:
		t = time.Now().Add(24 * 3 * time.Hour).Format("2006-01-02")
		text = strings.ReplaceAll(text, "大后天", "")
	case regexp.MustCompile(`[0-9]+天后`).MatchString(text):
		date := regexp.MustCompile(`[0-9]+天后`).FindString(text)
		text = strings.ReplaceAll(text, date, "")
		date = strings.ReplaceAll(date, "天后", "")
		dateInt, _ := strconv.ParseInt(date, 10, 64)
		t = time.Now().Add(24 * time.Duration(dateInt) * time.Hour).Format("2006-01-02")
	case regexp.MustCompile(`[0-9]+号`).MatchString(text):
		date := regexp.MustCompile(`[0-9]+号`).FindString(text)
		text = strings.ReplaceAll(text, date, "")
		date = strings.ReplaceAll(date, "号", "")
		//取当月
		t = time.Now().Format("2006-01") + "-" + date
	case regexp.MustCompile(`[0-9]+-[0-9]+-[0-9]+`).MatchString(text):
		date := regexp.MustCompile(`[0-9]+-[0-9]+-[0-9]+`).FindString(text)
		text = strings.ReplaceAll(text, date, "")
		t = date
	}

	//获取地点
	//用到或者-标记
	var fromName, toName string
	stations := strings.Split(text, "-")
	if len(stations) == 2 {
		fromName = stations[0]
		toName = stations[1]
		from = GetStationCode(h, stations[0])
		to = GetStationCode(h, stations[1])
	}

	stations = strings.Split(text, "到")
	if len(stations) == 2 {
		fromName = stations[0]
		toName = stations[1]
		from = GetStationCode(h, stations[0])
		to = GetStationCode(h, stations[1])
	}

	return t, from, to, fromName, toName
}

func GetStationCode(h *WsHandler, name string) string {
	station := models.TrainStation{
		Name: name,
	}
	err := h.Ds.Common().GetOneWithFilter(station, &station)
	if err != nil {
		return ""
	}
	return station.Code
}
