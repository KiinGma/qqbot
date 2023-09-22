package handlers

import (
	"errors"
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	"kiingma/cmd/qqbot/handler"
	"kiingma/cmd/qqbot/models"
	"kiingma/cmd/tiktok/errnos"
	"strconv"
)

//获取单双排隐藏分

func GetElo(h Handler, name string, area int64) {
	user := models.LOLUser{}
	user.Name = name
	user.Area = area
	openId, err := LOLGetId(h, name, area)
	if openId == "" {
		if err != nil {
			if err.Error() == errnos.CookieError() {
				PushComment(h, h.AwemeId, h.Cid, errnos.CookieError())
				return
			}
		}
		PushComment(h, h.AwemeId, h.Cid, errnos.OpenIDNotFind())
		return
	}
	user.OpenId = openId
	bs, err := LOLGetBattleListById(h, user, "1")
	if err != nil {
		if err.Error() == "WG_COMM_ERR_USER_CONFIG_LIMIT" {
			PushComment(h, h.AwemeId, h.Cid, errnos.UserLimit())
			return
		}
	}
	if len(bs) == 0 {
		PushComment(h, h.AwemeId, h.Cid, errnos.NoGame())
		return
	}

	gameId := bs[0].GameId
	bd := LOLGetBattleByGameId(h, user, gameId)
	teamId := "0"
	for _, v := range bd.PlayerDetails {
		if v.Openid == user.OpenId {
			teamId = v.TeamId
		}
	}
	l := models.GameLevel{}
	for _, v := range bd.PlayerDetails {
		if v.Openid == openId {
			l.ToStruct(v.BattleHonour.GameLevel)
		}
	}
	level := handler.TransformGameLevel(l)
	if level == "" {
		level = "真实段位: 尚未完成定级赛"
	} else {
		level = fmt.Sprintf("真实段位: %v", level)
	}

	for _, v := range bd.TeamDetails {
		if v.TeamId == teamId {
			PushComment(h, h.AwemeId, h.Cid, fmt.Sprintf("%v , 隐藏分: %v ", level, strconv.Itoa(v.TeamElo)))
			return
		}
	}
}

//获取战绩列表

func LOLGetBattleListById(h Handler, user models.LOLUser, count string) ([]models.LOLBattle, error) {
	cookie := user.Cookie
	if cookie == "" {
		adminUser := models.LOLUser{}
		_ = h.Ds.Common().GetByID(h.AppConfig.LOLAdminId, &adminUser)
		cookie = adminUser.Cookie
	}
	rb := fmt.Sprintf(`{"account_type":2,"area":%v,"id":"%v","count":%v,"filter":"rank","offset":0,"from_src":"lol_helper"}`, user.Area, user.OpenId, count)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       cookie,
		"Referer":      h.AppConfig.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.AppConfig.LOLGetBattleListUrl)
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
	return b.ToBattles([]byte(battlesData)), nil
}

//获取游戏openid

func LOLGetId(h Handler, name string, area int64) (string, error) {
	if name == "" || area == 0 {
		return "", nil
	}
	//用管理员的id去查
	user := models.LOLUser{}
	err := h.Ds.Common().GetByID(h.AppConfig.LOLAdminId, &user)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	rb := fmt.Sprintf(`{"nickname":"%v","from_src":"lol_helper"}`, name)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       user.Cookie,
		"Referer":      h.AppConfig.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.AppConfig.LOLSearchPlayerUrl)
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
		return "", errors.New(errnos.CookieError())
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

func LOLGetBattleByGameId(h Handler, user models.LOLUser, gameId string) *models.BattleDetail {
	cookie := user.Cookie
	if cookie == "" {
		adminUser := models.LOLUser{}
		_ = h.Ds.Common().GetByID(h.AppConfig.LOLAdminId, &adminUser)
		cookie = adminUser.Cookie
	}
	rb := fmt.Sprintf(`{"account_type":2,"area":%v,"id":"%v","game_id":"%v","from_src":"lol_helper"}`, user.Area, user.OpenId, gameId)
	res, err := req.SetHeaders(map[string]string{
		"Cookie":       cookie,
		"Referer":      h.AppConfig.LOLReferer1,
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.124 Safari/537.36 qblink wegame.exe WeGame/5.5.3.2131 ChannelId/0 QBCore/3.70.91.400 QQBrowser/9.0.2524.400",
	}).SetBodyBytes([]byte(rb)).Post(h.AppConfig.LOLGetBattleDetailUrl)
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
