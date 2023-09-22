package handlers

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/smartwalle/alipay/v3"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/global/consts"
	"kiingma/cmd/chatgpt/models"
	"kiingma/cmd/qqbot/constants"
	"kiingma/pkg/alipay_pkg"
	"kiingma/pkg/appconfig"
	"strconv"
	"time"
)

type AlipayHandler struct {
	ds datastore.DataStore
}

func NewAlipayHandler(ds datastore.DataStore) *AlipayHandler {
	return &AlipayHandler{
		ds: ds,
	}
}

func GetAlipayPageLink(userId uint64, amount int64) (*models.Ledger, error) {
	expireTime := time.Now().Add(time.Duration(consts.AlipayTimeExpire) * time.Minute)
	config := appconfig.LoadConfig()
	client, err := alipay_pkg.GetAlipayClient()
	if err != nil {
		return nil, err
	}
	var p = alipay.TradePagePay{}
	p.NotifyURL = fmt.Sprintf("http://%v:%v/notify", config.APIHost, config.APIPort)
	p.ReturnURL = fmt.Sprintf("http://%v:%v/return", config.APIHost, config.APIPort)
	p.Subject = "chat充值"
	id, _ := uuid.NewUUID()
	p.OutTradeNo = id.String()
	p.TimeExpire = expireTime.Format("2006-01-02 15:04:05")
	p.TotalAmount = strconv.FormatInt(amount, 10)
	p.ProductCode = constants.FastInstantTradePay
	p.QRPayMode = "1"
	url, err := client.TradePagePay(p)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	l := models.Ledger{}
	l.TradePagePay2Ledger(&p)
	l.UserId = userId
	l.TimeExpire = expireTime.Unix()
	l.PayLink = url.String()
	l.PayType = "alipay"
	return &l, nil
}
