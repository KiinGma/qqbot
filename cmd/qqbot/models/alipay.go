package models

type AlipayLink struct {
	Base
	Gid    uint64 `json:"gid"`
	Sid    uint64 `json:"sid"`
	LinkId string `json:"link_id"`
	Link   string `json:"link"`
}

type AlipayTradeOrder struct {
	Base

	GmtCreate      string `json:"gmt_create"`
	Charset        string `json:"charset"`
	GmtPayment     string `json:"gmt_payment"`
	NotifyTime     string `json:"notify_time"`
	Subject        string `json:"subject"`
	Sign           string `json:"sign"`
	BuyerId        string `json:"buyer_id"`
	InvoiceAmount  string `json:"invoice_amount"`
	Version        string `json:"version"`
	NotifyId       string `json:"notify_id"`
	FundBillList   string `json:"fund_bill_list"`
	NotifyType     string `json:"notify_type"`
	OutTradeNo     string `json:"out_trade_no"`
	TotalAmount    string `json:"total_amount"`
	TradeStatus    string `json:"trade_status"`
	TradeNo        string `json:"trade_no"`
	AuthAppId      string `json:"auth_app_id"`
	ReceiptAmount  string `json:"receipt_amount"`
	PointAmount    string `json:"point_amount"`
	BuyerPayAmount string `json:"buyer_pay_amount"`
	AppId          string `json:"app_id"`
	SignType       string `json:"sign_type"`
	SellerId       string `json:"seller_id"`
}
