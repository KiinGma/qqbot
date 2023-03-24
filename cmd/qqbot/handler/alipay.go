package handler

import (
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/labstack/echo/v4"
	"github.com/smartwalle/alipay/v3"
	"qqbot/cmd/qqbot/constants"
	"qqbot/cmd/qqbot/models"
	"qqbot/pkg/alipay_pkg"
	"qqbot/pkg/image_pkg"
)

//支付宝

func (h *WsHandler) Alipay() {
	for _, v := range h.resp.Data.MessageChain {
		switch {
		case v.Text == "zfb":
			GetAlipayPage(h)
		}
	}
}

func GetAlipayPage(h *WsHandler) {
	pay := models.AlipayLink{}
	id, _ := uuid.NewV4()
	pay.LinkId = id.String()
	link := GetAlipayPageLink(pay.LinkId)
	pay.Link = link
	pay.Gid = h.Gid
	pay.Sid = h.sendId
	err := h.Ds.Common().Create(&pay)
	if err != nil {
		fmt.Println(err)
		return
	}
	h.client.SendGroupImageWithBase64(h.Gid, h.sendId, image_pkg.QRCoreToBase64(`http://116.25.250.174:8081/pay/`+pay.LinkId))
}

//封装网页支付接口,并返回二维码

func GetAlipayPageLink(id string) string {
	client := alipay_pkg.GetAlipayClient()
	var p = alipay.TradePagePay{}
	p.NotifyURL = "http://116.25.250.174:8081/alipay/notify"
	p.Subject = "test"
	p.OutTradeNo = id
	p.TotalAmount = "0.01"
	p.ProductCode = constants.FastInstantTradePay
	p.QRPayMode = "1"

	p.GoodsDetail = []*alipay.GoodsDetail{{
		GoodsId:   "123",
		GoodsName: "xxx",
		Quantity:  1,
		Price:     13,
	}}
	url, err := client.TradePagePay(p)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	//把订单保存,并生成链接id发送给前端
	fmt.Println(url)
	return url.String()
}

//异步通知

func (h *WsHandler) AlipayNotify(c echo.Context) error {
	fmt.Println(`Notify`)
	fmt.Println(c.Request().FormValue("trade_status"))
	data := c.Request().PostForm
	//状态
	status := data.Get("trade_status")
	if status == constants.TradeSuccess {
		//支付成功
		//保存订单
		order := models.AlipayTradeOrder{}
		err := c.Bind(&order)
		if err != nil {
			fmt.Println(err)
			return err
		}
		err = h.Ds.Common().Create(&order)
		if err != nil {
			fmt.Println(err)
			return err
		}
	}
	return c.JSON(200, nil)
}

//支付成功后的跳转

func (h *WsHandler) AlipayReturn(c echo.Context) error {

	return nil
}

// 链接重定向请求,用于缩短和隐藏链接

func (h *WsHandler) GetPayLink(c echo.Context) error {
	id := c.Param("id")
	fmt.Println(id)
	pay := models.AlipayLink{}
	err := h.Ds.Common().GetByIDs(map[string]any{"link_id": id}, &pay)
	if err != nil {
		fmt.Println(err)
		return c.String(200, "订单不存在")
	}
	return c.Redirect(301, pay.Link)
}
