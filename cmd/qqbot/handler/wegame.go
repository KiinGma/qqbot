package handler

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"github.com/imroc/req/v3"
	"gorm.io/gorm"
	"io"
	"kiingma/cmd/qqbot/models"
	"strings"
	"time"
)

func WeGame(h WsHandler) {
	for _, v := range h.resp.Data.MessageChain {
		if v.Type == "Plain" {
			switch {
			case v.Text == "wg":
				WeGamePtQrLogin(h)
			}
		}
	}
}

func WeGamePtQrLogin(h WsHandler) {
	qrsig := GetWeGameQrSig(h, h.Gid, h.sendId)
	qrToken := 0
	if qrsig != "" {
		qrToken = Hash33(qrsig)
	} else {
		return
	}
	//40秒会失效
	for i := 0; i < 110; i++ {
		pSKey, pUin, err := WeGameHeartbeat(qrToken)
		if pSKey != "" && pUin != "" && err == nil {
			cookie := WeGameLoginByQQ(h.sendId, pUin, pSKey)
			user := models.LOLUser{
				Base: models.Base{
					ID: h.sendId,
				},
			}
			err = h.Ds.Common().GetByID(h.sendId, &user)
			user.Cookie = cookie
			user.Gid = h.Gid
			if err == gorm.ErrRecordNotFound {
				err = h.Ds.Common().Create(&user)
			} else {
				err = h.Ds.Common().Update(nil, &user)
			}
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 绑定成功")
			return
		}
		time.Sleep(time.Second)
	}
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 二维码已失效")
}

func GetWeGameQrSig(h WsHandler, gid, sendId uint64) string {
	t, _ := rand.Prime(rand.Reader, 54)
	resp, err := req.Get(fmt.Sprintf("https://ssl.ptlogin2.qq.com/ptqrshow?appid=1600001063&e=2&l=M&s=3&d=72&v=4&t=%v&daid=733&pt_3rd_aid=0&u1=https://www.wegame.com.cn/middle/login/third_callback.html", "0."+t.String()))
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	s := base64.StdEncoding.EncodeToString(body) //buff转成base64
	mcs := make([]models.MessageChain, 3)
	mcs[0] = models.MessageChain{
		Type:   "At",
		Target: sendId,
	}
	mcs[1] = models.MessageChain{
		Type: "Plain",
		Text: " 请使用手机qq扫码\n",
	}
	mcs[2] = models.MessageChain{
		Type:   "Image",
		Base64: s,
	}
	h.client.SendGroupMessage(gid, mcs)
	cookies := resp.Cookies()
	for _, v := range cookies {
		if v.Name == "qrsig" {
			return v.Value
		}
	}
	return ""
}

func WeGameHeartbeat(qrToken int) (pSKey string, pUin string, err error) {
	resp, err := req.Get(fmt.Sprintf("https://ssl.ptlogin2.qq.com/ptqrlogin?u1=https://www.wegame.com.cn/middle/login/third_callback.html&ptqrtoken=%v&ptredirect=0&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=0-0-%v&js_ver=23042119&js_type=1&login_sig=mQWI6fOMR2fAdP*Uh0cIvK9Q1JhbD4cK*DI1nSIvEMQBIh8KurXm4gzPXLrEmI-c&pt_uistyle=40&aid=1600001063&daid=733&&o1vId=a855bbbf82fa9a4cb3f1e003e4bfba3c&pt_js_version=e0d90e77", qrToken, time.Now().UnixMilli()))
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	fmt.Println(string(body))
	if len(resp.Cookies()) != 0 {
		s := strings.Split(string(body), "'")
		if len(s) > 5 {
			return GetPSKey(s[5])
		}
	}
	return "", "", err
}

// wg再登录,获取tgp_ticket

func WeGameLoginByQQ(id uint64, pUin, pSKey string) string {
	cookie := fmt.Sprintf("p_uin=%v;p_skey=%v", pUin, pSKey)
	resp, err := req.SetHeader("Cookie", cookie).SetHeader("Referer", "https://www.wegame.com.cn/middle/login/third_callback.html").SetBodyString(fmt.Sprintf(`{
    "login_info": {
        "qq_info_type": 6,
        "uin": "%v",
        "sig": "%v"
    },
    "config_params": {
        "lang_type": 0
    },
    "mappid": "10001",
    "mcode": "",
    "clienttype": "1000005"
}`, id, pSKey)).Post(fmt.Sprintf("https://www.wegame.com.cn/api/middle/clientapi/auth/login_by_qq"))
	defer resp.Body.Close()
	if err != nil {
		fmt.Println(err)
	}
	for _, v := range resp.Cookies() {
		if v.Name == "tgp_id" && v.Value != "" {
			cookie += "tgp_id=" + v.Value + ";"
		} else if v.Name == "tgp_ticket" && v.Value != "" {
			cookie += "tgp_ticket=" + v.Value + ";"
		}
	}
	fmt.Println(resp.Cookies())
	return cookie
}
