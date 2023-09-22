package handler

import (
	"bufio"
	"errors"
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"gorm.io/gorm"
	"io"
	"kiingma/cmd/qqbot/models"
	"kiingma/cmd/qqbot/repository"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

func (h *WsHandler) YuanShenCookieOnline() {
	//Test()
	//定时从数据库获取用户来轮询保证cookie活性
	for {
		users := make([]models.YuanShenUserInfo, 0)
		filters := repository.Filters{
			NeFilter: map[string]interface{}{
				"authkey": "",
			},
		}
		h.Ds.Common().GetAllWithFilter(filters, models.YuanShenUserInfo{}, &users)
		for _, v := range users {
			err := YuanShenGetLog(h, &v)
			err = YuanShenGetWeaponLog(h, &v)
			err = YuanShenGetOftenLog(h, &v)
			if err != nil {
				v.Authkey = ""
				h.Ds.Common().Update(nil, v)
			}
		}
		fmt.Println("原神cookie激活中")
		time.Sleep(time.Minute)
	}
}

func (h *WsHandler) YuanShen(groupId uint64, message string) {
	switch {
	case message == "原神绑定":
		SessionTypeMap = map[uint64]int{
			h.sendId: 5,
		}
		mcs := []models.MessageChain{
			{Type: "Plain", Text: fmt.Sprintf("请*私信*我发送原神代码\n获取原神代码如下:\n1. 下载以下链接exe文件:\nhttp://42.193.141.42:8081/data/gy.exe\n2. 打开原神抽卡\n3. 打开 gy.exe")},
		}
		h.client.SendGroupMessage(h.Gid, mcs)
	case strings.Index(message, "升级材料") != -1:
		UpgradeRole(h, groupId, message)
	case message == "材料":
		GetMat(h, groupId, message)
	case strings.Index(message, "武器") != -1:
		GetYuanShenWeapon(h, groupId, message)
	case strings.Index(message, "收益") != -1:
		Earnings(h, groupId, message)
	case strings.Index(message, "参考") != -1:
		ReferencePanel(h, groupId, message)
	default:
	}
}

func PlayInfo(h *WsHandler, groupId uint64, message string) {
	message = strings.ReplaceAll(message, " 原神 ", "")
	message = strings.ReplaceAll(message, " 原神", "")
	message = strings.ReplaceAll(message, "原神", "")
	message = strings.ReplaceAll(message, " 玩家 ", "")
	message = strings.ReplaceAll(message, " 玩家", "")
	message = strings.ReplaceAll(message, "玩家", "")
	message = strings.ReplaceAll(message, " ", "")
	resp, err := req.Get("https://enka.network/u/" + message + "/__data.json")
	if err != nil {
		fmt.Println(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	mcs := []models.MessageChain{
		{Type: "Plain", Text: "名称: " + gjson.GetBytes(body, "playerInfo.nickname").String() + "\n"},
		{Type: "Plain", Text: "等级: " + gjson.GetBytes(body, "playerInfo.level").String() + "\n"},
		{Type: "Plain", Text: "世界等级: " + gjson.GetBytes(body, "playerInfo.worldLevel").String() + "\n"},
		{Type: "Plain", Text: "完成成就数: " + gjson.GetBytes(body, "playerInfo.finishAchievementNum").String() + "\n"},
		{Type: "Plain", Text: "当前深渊层数: " + gjson.GetBytes(body, "playerInfo.towerFloorIndex").String() + "\n"},
		{Type: "Plain", Text: "当前深渊房间: " + gjson.GetBytes(body, "playerInfo.towerLevelIndex").String() + "\n"},
	}
	showAvatarInfoList := gjson.GetBytes(body, "playerInfo.showAvatarInfoList").Array()
	//查询展柜角色
	for k, v := range showAvatarInfoList {
		if k == 0 {
			mcs = append(mcs, models.MessageChain{Type: "Plain", Text: "当前展柜角色: \n"})
		}
		mcs = append(mcs, models.MessageChain{Type: "Plain", Text: "   " + gjson.Get(models.YuanShenRoleData, v.Get("avatarId").String()+".Name").String() + ":\n"}, models.MessageChain{Type: "Plain", Text: "      等级: " + v.Get("level").String() + "\n"})
		skillLevelMap := gjson.GetBytes(body, "avatarInfoList."+strconv.Itoa(k)+".skillLevelMap").String()
		reg1 := regexp.MustCompile(`"[0-9]*":`)
		result1 := reg1.ReplaceAllString(skillLevelMap, "")
		result1 = strings.ReplaceAll(result1, " ", "")
		result1 = strings.ReplaceAll(result1, "{", "")
		result1 = strings.ReplaceAll(result1, "}", "")
		avatarInfoList := models.MessageChain{Type: "Plain", Text: "      天赋: " + result1 + "\n"}
		mcs = append(mcs, avatarInfoList)
	}

	h.client.SendGroupMessage(groupId, mcs)
}

func ReferencePanel(h *WsHandler, groupId uint64, message string) {
	message = strings.ReplaceAll(message, " 原神 ", "")
	message = strings.ReplaceAll(message, " 原神", "")
	message = strings.ReplaceAll(message, "原神", "")
	message = strings.ReplaceAll(message, " 参考 ", "")
	message = strings.ReplaceAll(message, " 参考", "")
	message = strings.ReplaceAll(message, "参考", "")
	message = strings.ReplaceAll(message, " 面板 ", "")
	message = strings.ReplaceAll(message, " 面板", "")
	message = strings.ReplaceAll(message, "面板", "")
	message = strings.ReplaceAll(message, " ", "")

	mcs := []models.MessageChain{
		{Type: "Image", Url: "http://42.193.141.42:8081/image/参考/" + message + ".png"},
	}
	h.client.SendGroupMessage(groupId, mcs)
}

func Earnings(h *WsHandler, groupId uint64, message string) {
	message = strings.ReplaceAll(message, " 原神 ", "")
	message = strings.ReplaceAll(message, " 原神", "")
	message = strings.ReplaceAll(message, "原神", "")
	message = strings.ReplaceAll(message, " 收益 ", "")
	message = strings.ReplaceAll(message, " 收益", "")
	message = strings.ReplaceAll(message, "收益", "")
	message = strings.ReplaceAll(message, " ", "")

	mcs := []models.MessageChain{
		{Type: "Image", Url: "https://static.cherishmoon.fun/LittlePaimon/blue/" + message + ".jpg"},
	}
	go DownloadImage("https://static.cherishmoon.fun/LittlePaimon/blue/"+message+".jpg", "./image/收益/", message+`.jpg`)
	h.client.SendGroupMessage(groupId, mcs)
}

func UpgradeRole(h *WsHandler, groupId uint64, message string) {
	message = strings.ReplaceAll(message, " 原神 ", "")
	message = strings.ReplaceAll(message, " 原神", "")
	message = strings.ReplaceAll(message, "原神", "")
	message = strings.ReplaceAll(message, " 升级材料 ", "")
	message = strings.ReplaceAll(message, " 升级材料", "")
	message = strings.ReplaceAll(message, "升级材料", "")
	message = strings.ReplaceAll(message, " ", "")
	mcs := []models.MessageChain{
		{Type: "Image", Url: "https://static.cherishmoon.fun/LittlePaimon/RoleMaterials/" + message + "材料.jpg"},
	}

	go DownloadImage("https://static.cherishmoon.fun/LittlePaimon/RoleMaterials/"+message+"材料.jpg", "./image/升级材料/", message+`.jpg`)

	h.client.SendGroupMessage(groupId, mcs)
}

func GetYuanShenWeapon(h *WsHandler, groupId uint64, message string) {
	message = strings.ReplaceAll(message, " 武器 ", "")
	message = strings.ReplaceAll(message, " 武器", "")
	message = strings.ReplaceAll(message, "武器", "")
	message = strings.ReplaceAll(message, " 原神 ", "")
	message = strings.ReplaceAll(message, " 原神", "")
	message = strings.ReplaceAll(message, "原神", "")
	message = strings.ReplaceAll(message, " ", "")
	mcs := []models.MessageChain{
		{Type: "Image", Url: "https://static.cherishmoon.fun/LittlePaimon/WeaponMaps/" + message + ".jpg"},
	}
	go DownloadImage("https://static.cherishmoon.fun/LittlePaimon/WeaponMaps/"+message+".jpg", "./image/原神武器/", message+`.jpg`)

	h.client.SendGroupMessage(groupId, mcs)
}

func GetMat(h *WsHandler, groupId uint64, message string) {
	switch {
	case strings.Index(message, "周一") != -1, strings.Index(message, "周四") != -1, strings.Index(message, "星期一") != -1, strings.Index(message, "星期四") != -1:
		mcs := []models.MessageChain{
			{Type: "Image", Url: "http://42.193.141.42:8081/image/周一周四材料.png"},
		}
		h.client.SendGroupMessage(groupId, mcs)
	case strings.Index(message, "周二") != -1, strings.Index(message, "周五") != -1, strings.Index(message, "星期二") != -1, strings.Index(message, "星期五") != -1:
		mcs := []models.MessageChain{
			{Type: "Image", Url: "http://42.193.141.42:8081/image/周二周五材料.png"},
		}
		h.client.SendGroupMessage(groupId, mcs)
	case strings.Index(message, "周三") != -1, strings.Index(message, "周六") != -1, strings.Index(message, "星期三") != -1, strings.Index(message, "星期六") != -1:
		mcs := []models.MessageChain{
			{Type: "Image", Url: "http://42.193.141.42:8081/image/周三周六材料.png"},
		}
		h.client.SendGroupMessage(groupId, mcs)
	default:
		AutoGetMat(h, groupId)
	}
}

// AutoGetMat 自动获取今日刷新的材料
func AutoGetMat(h *WsHandler, groupId uint64) {

	//不带星期自动获取今日的材料
	week := time.Now().Weekday()
	switch week {
	case time.Monday, time.Thursday:
		mcs := []models.MessageChain{
			{Type: "Image", Url: "http://42.193.141.42:8081/image/周一周四材料.png"},
		}
		h.client.SendGroupMessage(groupId, mcs)
	case time.Tuesday, time.Friday:
		mcs := []models.MessageChain{
			{Type: "Image", Url: "http://42.193.141.42:8081/image/周二周五材料.png"},
		}
		h.client.SendGroupMessage(groupId, mcs)
	case time.Wednesday, time.Saturday:
		mcs := []models.MessageChain{
			{Type: "Image", Url: "http://42.193.141.42:8081/image/周三周六材料.png"},
		}
		h.client.SendGroupMessage(groupId, mcs)
	}
}

// DownloadImage 保存图片
func DownloadImage(path, savePath, name string) {
	_, err := os.Stat(savePath + name)
	if !os.IsNotExist(err) {
		return
	}
	res, err := http.Get(path)
	if err != nil {
		fmt.Println("A error occurred!")
		return
	}
	defer res.Body.Close()
	// 获得get请求响应的reader对象
	reader := bufio.NewReaderSize(res.Body, 320*1024)

	file, err := os.Create(savePath + name)
	defer file.Close()
	if os.IsNotExist(err) {
		os.MkdirAll(savePath, os.ModePerm)
		file, err = os.Create(savePath + name)
		defer file.Close()
	}
	// 获得文件的writer对象
	writer := bufio.NewWriter(file)
	io.Copy(writer, reader)
}

// AnalyseGaChaLog 抽卡分析
func AnalyseGaChaLog(h *WsHandler) {
	user := models.YuanShenUserInfo{
		ID: h.sendId,
	}
	err := h.Ds.Common().GetOneWithFilter(user, &user)
	if err == gorm.ErrRecordNotFound || user.Uid == "" {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("你的角色未绑定·请回复:原神绑定,进行绑定"))
		return
	}

	msg := make([]models.MessageChain, 0)
	at := models.MessageChain{
		Type: "At", Target: h.sendId,
	}
	analyseUp := AnalyseUp(h, user)
	analyseWeapon := AnalyseWeapon(h, user)
	analyseOften := AnalyseOften(h, user)
	msg = append(msg, at, analyseUp, analyseWeapon, analyseOften)
	h.client.SendGroupMessage(h.Gid, msg)
}

//常驻

func AnalyseOften(h *WsHandler, user models.YuanShenUserInfo) models.MessageChain {
	logs := make([]models.YuanShenSimpleGaChaLog, 0)
	filters := repository.Filters{
		Filter: map[string]interface{}{
			"uid":        user.Uid,
			"gacha_type": "200",
		},
		OrderBy: "id DESC",
	}
	h.Ds.Common().GetAllWithFilter(filters, models.YuanShenGaChaLog{}, &logs)
	//目前多少抽未出紫色
	z := 0
	//目前多少抽未出金
	f := 0
	t := 0
	//当前抽数
	o := 0
	//出金前置数
	p := make([]int, 0)
	//当前五星角色
	rMap := make([]string, 0)
	for k, v := range logs {
		o++
		if v.RankType == "4" && z == 0 {
			z = k
		}
		if v.RankType == "5" {
			if t == 0 {
				f = k
				o = 0
				t++
			}
			rMap = append(rMap, strconv.Itoa(o), v.Name)
			p = append(p, o)
			o = 0
		}
	}
	rMap = append(rMap, strconv.Itoa(o))
	p = append(p, o)
	msg := " \n常驻出卡顺序:\n"
	for j := 1; j < len(rMap); j++ {
		if j%2 == 1 {
			msg += rMap[j]
		} else {
			msg += " [" + rMap[j] + "]\n"
		}
	}
	v := 0.6*float64(f)*1.86142 + 0.6
	//计算平均抽数
	a := aver(p[1:])
	msg += fmt.Sprintf("总抽数: %v ,平均: %v , 当前 %v 抽未出金( 出金概率 %v%%), %v 抽未出紫", len(logs), a, f, v, z)
	return models.MessageChain{
		Type: "Plain", Text: msg,
	}
}

//up池分析

func AnalyseUp(h *WsHandler, user models.YuanShenUserInfo) models.MessageChain {
	logs := make([]models.YuanShenSimpleGaChaLog, 0)
	filters := repository.Filters{
		Filter: map[string]interface{}{
			"uid": user.Uid,
		},
		InFilter: map[string][]interface{}{
			"gacha_type": {"301", "400"},
		},
		OrderBy: "id DESC",
	}
	h.Ds.Common().GetAllWithFilter(filters, models.YuanShenGaChaLog{}, &logs)
	//目前多少抽未出紫色
	z := 0
	//目前多少抽未出金
	f := 0
	t := 0
	//当前抽数
	o := 0
	//出金前置数
	p := make([]int, 0)
	//当前五星角色
	rMap := make([]string, 0)
	for k, v := range logs {
		o++
		if v.RankType == "4" && z == 0 {
			z = k
		}
		if v.RankType == "5" {
			if t == 0 {
				f = k
				o = 0
				t++
			}
			rMap = append(rMap, strconv.Itoa(o), v.Name)
			p = append(p, o)
			o = 0
		}
	}
	rMap = append(rMap, strconv.Itoa(o))
	p = append(p, o)
	msg := " \nUP出卡顺序:\n"
	for j := 1; j < len(rMap); j++ {
		if j%2 == 1 {
			msg += rMap[j]
		} else {
			msg += " [" + rMap[j] + "]\n"
		}
	}
	v := 0.6*float64(f)*1.86142 + 0.6
	//计算平均抽数
	a := aver(p[1:])
	msg += fmt.Sprintf("总抽数: %v ,平均: %v , 当前 %v 抽未出金( 出金概率 %v%% ), %v 抽未出紫\n", len(logs), a, f, v, z)
	return models.MessageChain{
		Type: "Plain", Text: msg,
	}
}

//武器池分析

func AnalyseWeapon(h *WsHandler, user models.YuanShenUserInfo) models.MessageChain {
	logs := make([]models.YuanShenSimpleGaChaLog, 0)
	filters := repository.Filters{
		Filter: map[string]interface{}{
			"uid":        user.Uid,
			"gacha_type": "302",
		},
		OrderBy: "id DESC",
	}
	h.Ds.Common().GetAllWithFilter(filters, models.YuanShenGaChaLog{}, &logs)
	//目前多少抽未出紫色
	z := 0
	//目前多少抽未出金
	f := 0
	t := 0
	//当前抽数
	o := 0
	//出金前置数
	p := make([]int, 0)
	//当前五星角色
	rMap := make([]string, 0)
	for k, v := range logs {
		o++
		if v.RankType == "4" && z == 0 {
			z = k
		}
		if v.RankType == "5" {
			if t == 0 {
				f = k
				o = 0
				t++
			}
			rMap = append(rMap, strconv.Itoa(o), v.Name)
			p = append(p, o)
			o = 0
		}
	}
	rMap = append(rMap, strconv.Itoa(o))
	p = append(p, o)
	msg := " \n武器出卡顺序:\n"
	for j := 1; j < len(rMap); j++ {
		if j%2 == 1 {
			msg += rMap[j]
		} else {
			msg += " [" + rMap[j] + "]\n"
		}
	}
	v := 0.7*float64(f)*1.79567 + 0.7
	//计算平均抽数
	a := aver(p[1:])
	msg += fmt.Sprintf("总抽数: %v ,平均: %v , 当前 %v 抽未出金( 出金概率 %v%% ), %v 抽未出紫\n", len(logs), a, f, v, z)
	return models.MessageChain{
		Type: "Plain", Text: msg,
	}
}

func GetGold(h *WsHandler) {
	//先获取uuid
	user := models.YuanShenUserInfo{
		ID: h.sendId,
	}
	err := h.Ds.Common().GetOneWithFilter(user, &user)
	if err == gorm.ErrRecordNotFound || user.Uid == "" {
		h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("你的角色未绑定·请回复:原神绑定,进行绑定"))
		return
	}
	//先查询最后获得的五星
	log := models.YuanShenGaChaLog{}
	log.RankType = "5"
	log.Uid = user.Uid
	err = h.Ds.YuanShenService().GetOneGold(&log)
	c, _ := h.Ds.YuanShenService().GetNotGoldCount(log.Time)
	//计算出金概率
	v := 0.6*float64(c)*1.86142 + 0.6
	h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf("您当前抽数: %v抽 , 出金的概率: %v", c, v)+"%")
}

// YuanShenBind 绑定
func YuanShenBind(h *WsHandler) {
	user := models.YuanShenUserInfo{}
	u, err := url.Parse(h.resp.Data.MessageChain[1].Text)
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
	user.AuthkeyVer = u.Query().Get("authkey_ver")
	user.Authkey = url.QueryEscape(u.Query().Get("authkey"))
	user.InitType = u.Query().Get("init_type")
	user.GachaType = "301"
	user.Lang = u.Query().Get("lang")
	user.Size = "20"
	user.EndId = "0"
	user.ID = h.sendId
	err = YuanShenGetLog(h, &user)
	err = YuanShenGetWeaponLog(h, &user)
	err = YuanShenGetOftenLog(h, &user)
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
	err = h.Ds.Common().GetOneWithFilter(models.YuanShenUserInfo{Uid: user.Uid, ID: h.sendId}, &models.YuanShenUserInfo{})
	if err == gorm.ErrRecordNotFound {
		h.Ds.Common().Create(&user)
	} else {
		h.Ds.Common().Update(nil, &user)
	}
	h.client.SendFriendMessageWithString(h.sendId, fmt.Sprintf("绑定成功"))
	delete(SessionTypeMap, h.sendId)
}

// YuanShenGetLog 获取所有抽卡记录
func YuanShenGetLog(h *WsHandler, user *models.YuanShenUserInfo) error {
	endId := "0"
	for {
		time.Sleep(100 * time.Millisecond)
		res, err := req.Get(fmt.Sprintf(`https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?init_type=%v&gacha_type=%v&lang=%v&size=%v&end_id=%v&authkey_ver=%v&authkey=%v&timestamp=%v`, user.InitType, user.GachaType, user.Lang, user.Size, endId, user.AuthkeyVer, user.Authkey, time.Now().Unix()))
		if err != nil {
			fmt.Println(err)
			err = errors.New("绑定失败")
			return err
		}
		body, err := io.ReadAll(res.Body)
		message := gjson.GetBytes(body, "message").String()

		if message != "OK" {
			err = errors.New("绑定失败")
			return err
		}

		if len(gjson.GetBytes(body, "data.list").Array()) == 0 {
			break
		}
		for _, v := range gjson.GetBytes(body, "data.list").Array() {
			log := models.YuanShenGaChaLog{}
			log.ToStruct([]byte(v.String()))
			user.Uid = log.Uid
			endId = log.Id
			e := h.Ds.Common().Create(&log)
			if e != nil {
				return nil
			}
		}
	}
	return nil
}

//获取武器池记录

func YuanShenGetWeaponLog(h *WsHandler, user *models.YuanShenUserInfo) error {
	endId := "0"
	for {
		time.Sleep(100 * time.Millisecond)
		res, err := req.Get(fmt.Sprintf(`https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?init_type=%v&gacha_type=%v&lang=%v&size=%v&end_id=%v&authkey_ver=%v&authkey=%v&timestamp=%v`, user.InitType, 302, user.Lang, user.Size, endId, user.AuthkeyVer, user.Authkey, time.Now().Unix()))
		if err != nil {
			fmt.Println(err)
			err = errors.New("绑定失败")
			return err
		}
		body, err := io.ReadAll(res.Body)
		message := gjson.GetBytes(body, "message").String()

		if message != "OK" {
			err = errors.New("绑定失败")
			return err
		}

		if len(gjson.GetBytes(body, "data.list").Array()) == 0 {
			break
		}

		for _, v := range gjson.GetBytes(body, "data.list").Array() {
			log := models.YuanShenGaChaLog{}
			log.ToStruct([]byte(v.String()))
			user.Uid = log.Uid
			endId = log.Id
			e := h.Ds.Common().Create(&log)
			if e != nil {
				return nil
			}
		}
	}
	return nil
}

func YuanShenGetOftenLog(h *WsHandler, user *models.YuanShenUserInfo) error {
	endId := "0"
	for {
		time.Sleep(100 * time.Millisecond)
		res, err := req.Get(fmt.Sprintf(`https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?init_type=%v&gacha_type=%v&lang=%v&size=%v&end_id=%v&authkey_ver=%v&authkey=%v&timestamp=%v`, user.InitType, 200, user.Lang, user.Size, endId, user.AuthkeyVer, user.Authkey, time.Now().Unix()))
		if err != nil {
			fmt.Println(err)
			err = errors.New("绑定失败")
			return err
		}
		body, err := io.ReadAll(res.Body)
		message := gjson.GetBytes(body, "message").String()

		if message != "OK" {
			err = errors.New("绑定失败")
			return err
		}

		if len(gjson.GetBytes(body, "data.list").Array()) == 0 {
			break
		}

		for _, v := range gjson.GetBytes(body, "data.list").Array() {
			log := models.YuanShenGaChaLog{}
			log.ToStruct([]byte(v.String()))
			user.Uid = log.Uid
			endId = log.Id
			e := h.Ds.Common().Create(&log)
			if e != nil {
				return nil
			}
		}
	}
	return nil
}

// 概率预测
// in 数组

func ProbabilityForecasting(list []int) int {

	return 0
}

//平均数算法

func aver(list []int) float64 {
	sum := 0
	l := 0
	for _, v := range list {
		sum += v
		l++
	}
	return float64(sum / l)
}
