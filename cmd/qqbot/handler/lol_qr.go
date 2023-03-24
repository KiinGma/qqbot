package handler

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"github.com/imroc/req/v3"
	"io"
	"net/http"
	"qqbot/cmd/qqbot/models"
	"strings"
	"time"
)

//扫码登录

func PtQrLogin(h *WsHandler, gid, sendId uint64) {
	qrsig := GetQrSig(h, gid, sendId)
	qrToken := 0
	if qrsig != "" {
		qrToken = Hash33(qrsig)
	} else {
		return
	}
	//40秒会失效
	for i := 0; i < 110; i++ {
		pSKey, pUin, err := LOLHeartbeat(qrToken)
		if pSKey != "" && pUin != "" && err == nil {
			user := models.LOLUser{
				Base: models.Base{
					ID: sendId,
				},
				Gid:    h.Gid,
				Cookie: fmt.Sprintf("p_uin=%v;p_skey=%v", pUin, pSKey),
			}
			accountId, err := CheckCookie(user.Cookie)
			if err != nil {
				fmt.Println(err)
				return
			}
			user.AccountId = accountId
			err = h.Ds.Common().Update(nil, &user)
			if err != nil {
				return
			}
			h.client.SendGroupMessageWithString(gid, sendId, " 绑定成功")
			return
		}
		time.Sleep(time.Second)
	}
	h.client.SendGroupMessageWithString(gid, sendId, " 二维码已失效")
}

//心跳获取登录状态

func LOLHeartbeat(qrToken int) (pSKey string, pUin string, err error) {
	resp, err := req.Get(fmt.Sprintf("https://ssl.ptlogin2.qq.com/ptqrlogin?u1=https://lol.qq.com/act/a20191210super/index.shtml&ptqrtoken=%v&ptredirect=1&h=1&t=1&g=1&from_ui=1&ptlang=2052&js_ver=22101815&js_type=1&login_sig=akSQVrahlThy9ymKtIrYbn-DC2Jjzf986tjlZTwti9TZhmQSXajpvPuItA*lLNh4&pt_uistyle=40&aid=21000501&daid=8&has_onekey=1&&o1vId=587fbe3c00910c5167a7beff68ad5920&action=0-0-%v", qrToken, time.Now().UnixMilli()))
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

//获取p_skey

func GetPSKey(u string) (pSKey string, pUin string, err error) {
	res, err := http.NewRequest(http.MethodGet, u, nil)
	resp, err := http.DefaultTransport.RoundTrip(res)
	if resp != nil {
		defer resp.Body.Close()
	}
	if err != nil {
		fmt.Println(err)
	}
	//resp, _ := req.Get(u)
	defer resp.Body.Close()
	fmt.Println()
	for _, v := range resp.Cookies() {
		if v.Name == "p_skey" && v.Value != "" {
			pSKey = v.Value
		} else if v.Name == "p_uin" && v.Value != "" {
			pUin = v.Value
		}
		fmt.Println(v)
	}
	return
}

func Hash33(qrsig string) int {
	e := 0
	for i := 0; i < len(qrsig); i++ {
		e += (e << 5) + int(qrsig[i])
	}
	qrtoken := e & 2147483647
	return qrtoken
}

func GetQrSig(h *WsHandler, gid, sendId uint64) string {
	t, _ := rand.Prime(rand.Reader, 54)
	resp, err := req.Get(fmt.Sprintf("https://ssl.ptlogin2.qq.com/ptqrshow?appid=21000501&e=2&l=M&s=3&d=72&v=4&t=%v&daid=8&pt_3rd_aid=0", "0."+t.String()))
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
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
