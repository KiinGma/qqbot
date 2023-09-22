package models

import "github.com/smartwalle/alipay/v3"

type Ledger struct {
	Base
	UserId     uint64 `json:"user_id"`
	PayLink    string `json:"pay_link"`
	PayType    string `json:"pay_type"`
	TimeExpire int64  `json:"time_expire,omitempty"`
	TradeNotification
}

func (m *Ledger) TradePagePay2Ledger(t *alipay.TradePagePay) {
	m.TotalAmount = t.TotalAmount
	m.OutTradeNo = t.OutTradeNo
}

func (m *Ledger) TradeWapPay2Ledger(t *alipay.TradeWapPay) {
	m.TotalAmount = t.TotalAmount
	m.OutTradeNo = t.OutTradeNo
}

func (m *Ledger) TradeNotification2Ledger(t *TradeNotification) {
	m.AuthAppId = t.AuthAppId
	m.NotifyTime = t.NotifyTime
	m.NotifyType = t.NotifyType
	m.NotifyId = t.NotifyId
	m.AppId = t.AppId
	m.Charset = t.Charset
	m.Version = t.Version
	m.SignType = t.SignType
	m.Sign = t.Sign
	m.TradeNo = t.TradeNo
	m.OutTradeNo = t.OutTradeNo
	m.OutBizNo = t.OutBizNo
	m.BuyerId = t.BuyerId
	m.BuyerLogonId = t.BuyerLogonId
	m.SellerId = t.SellerId
	m.SellerEmail = t.SellerEmail
	m.TradeStatus = t.TradeStatus
	m.TotalAmount = t.TotalAmount
	m.ReceiptAmount = t.ReceiptAmount
	m.InvoiceAmount = t.InvoiceAmount
	m.BuyerPayAmount = t.BuyerPayAmount
	m.PointAmount = t.PointAmount
	m.RefundFee = t.RefundFee
	m.Subject = t.Subject
	m.Body = t.Body
	m.GmtCreate = t.GmtCreate
	m.GmtPayment = t.GmtPayment
	m.GmtRefund = t.GmtRefund
	m.GmtClose = t.GmtClose
	m.FundBillList = t.FundBillList
	m.PassbackParams = t.PassbackParams
	m.VoucherDetailList = t.VoucherDetailList
	m.AgreementNo = t.AgreementNo
	m.ExternalAgreementNo = t.ExternalAgreementNo
}
