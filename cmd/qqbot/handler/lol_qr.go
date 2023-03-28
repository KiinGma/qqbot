package handler

//扫码登录
/*
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

func LOLGameListOld(h *WsHandler) {
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
*/
