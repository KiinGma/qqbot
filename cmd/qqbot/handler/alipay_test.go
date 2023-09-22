package handler

import (
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/smartwalle/alipay/v3"
	"kiingma/pkg/alipay_pkg"
	"kiingma/pkg/image_pkg"
	"testing"
)

func TestClient_TradeAppPay(t *testing.T) {
	t.Log("========== TradeAppPay ==========")
	client, err := alipay_pkg.GetAlipayClient()
	var p = alipay.TradePreCreate{}
	p.OutTradeNo = "20150320010101001"
	p.TotalAmount = "0.01"
	p.Subject = "test"
	url, err := client.TradePreCreate(p)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(url.Content.QRCode)
	fmt.Println(url)
}

func TestClient_TradePreCreate(t *testing.T) {
	client, err := alipay.New("", ``, false)
	if err != nil {
		fmt.Println(err)
		return
	}
	client.SetEncryptKey("")
	client.LoadAliPayPublicKey("")
	var p = alipay.TradePreCreate{}
	p.OutTradeNo = "no_0001"
	p.Subject = "测试订单"
	p.TotalAmount = "10.10"

	rsp, err := client.TradePreCreate(p)
	if err != nil {
		t.Fatal(err)
	}
	if rsp.Content.Code != alipay.CodeSuccess {
		t.Fatal(rsp.Content.Msg, rsp.Content.SubMsg)
	}
	t.Log(rsp.Content.QRCode)
	image_pkg.QRCoreToBase64(rsp.Content.QRCode)
}

func TestClient_TradePagePay(t *testing.T) {
	client, err := alipay_pkg.GetAlipayClient()
	t.Log("========== TradePagePay ==========")
	var p = alipay.TradePagePay{}
	p.NotifyURL = "http://127.0.0.1:8081/test"
	p.ReturnURL = "http://127.0.0.1:8081/test"
	p.Subject = "test"
	id, _ := uuid.NewV4()
	p.OutTradeNo = id.String()
	p.TotalAmount = "0.01"
	p.TimeoutExpress = "1m"
	p.ProductCode = "FAST_INSTANT_TRADE_PAY"
	p.QRPayMode = "1"

	p.GoodsDetail = []*alipay.GoodsDetail{&alipay.GoodsDetail{
		GoodsId:   "123",
		GoodsName: "xxx",
		Quantity:  1,
		Price:     13,
	}}

	url, err := client.TradePagePay(p)
	if err != nil {
		t.Fatal(err)
	}
	u := url.String()
	fmt.Println(u)
	t.Log(url)
}

func TestAmount(t *testing.T) {
	var a int64
	var b int64
	a = 1234
	b = 100
	Amount := fmt.Sprintf("%.3f", float64(a)/float64(b))
	fmt.Println(Amount)
}
