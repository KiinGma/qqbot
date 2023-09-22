package models

type TradeNotification struct {
	AuthAppId           string      `json:"auth_app_id" form:"auth_app_id"`                     // App Id
	NotifyTime          string      `json:"notify_time" form:"auth_app_id"`                     // 通知时间
	NotifyType          string      `json:"notify_type" form:"notify_type" `                    // 通知类型
	NotifyId            string      `json:"notify_id" form:"notify_id"`                         // 通知校验ID
	AppId               string      `json:"app_id" form:"app_id"`                               // 开发者的app_id
	Charset             string      `json:"charset"  form:"charset"`                            // 编码格式
	Version             string      `json:"version" form:"version"`                             // 接口版本
	SignType            string      `json:"sign_type" form:"sign_type"`                         // 签名类型
	Sign                string      `json:"sign" form:"sign"`                                   // 签名
	TradeNo             string      `json:"trade_no" form:"trade_no"`                           // 支付宝交易号
	OutTradeNo          string      `json:"out_trade_no" form:"out_trade_no"`                   // 商户订单号
	OutBizNo            string      `json:"out_biz_no" form:"out_biz_no"`                       // 商户业务号
	BuyerId             string      `json:"buyer_id" form:"buyer_id"`                           // 买家支付宝用户号
	BuyerLogonId        string      `json:"buyer_logon_id" form:"buyer_logon_id"`               // 买家支付宝账号
	SellerId            string      `json:"seller_id" form:"seller_id"`                         // 卖家支付宝用户号
	SellerEmail         string      `json:"seller_email" form:"seller_email"`                   // 卖家支付宝账号
	TradeStatus         TradeStatus `json:"trade_status" form:"trade_status"`                   // 交易状态
	TotalAmount         string      `json:"total_amount" form:"total_amount"`                   // 订单金额
	ReceiptAmount       string      `json:"receipt_amount" form:"receipt_amount"`               // 实收金额
	InvoiceAmount       string      `json:"invoice_amount" form:"invoice_amount"`               // 开票金额
	BuyerPayAmount      string      `json:"buyer_pay_amount" form:"buyer_pay_amount"`           // 付款金额
	PointAmount         string      `json:"point_amount" form:"point_amount"`                   // 集分宝金额
	RefundFee           string      `json:"refund_fee" form:"refund_fee"`                       // 总退款金额
	Subject             string      `json:"subject" form:"subject"`                             // 商品的标题/交易标题/订单标题/订单关键字等，是请求时对应的参数，原样通知回来。
	Body                string      `json:"body" form:"body"`                                   // 商品描述
	GmtCreate           string      `json:"gmt_create" form:"gmt_create"`                       // 交易创建时间
	GmtPayment          string      `json:"gmt_payment" form:"gmt_payment"`                     // 交易付款时间
	GmtRefund           string      `json:"gmt_refund" form:"gmt_refund"`                       // 交易退款时间
	GmtClose            string      `json:"gmt_close" form:"gmt_close"`                         // 交易结束时间
	FundBillList        string      `json:"fund_bill_list" form:"fund_bill_list"`               // 支付金额信息
	PassbackParams      string      `json:"passback_params" form:"passback_params"`             // 回传参数
	VoucherDetailList   string      `json:"voucher_detail_list" form:"voucher_detail_list"`     // 优惠券信息
	AgreementNo         string      `json:"agreement_no" form:"agreement_no"`                   //支付宝签约号
	ExternalAgreementNo string      `json:"external_agreement_no" form:"external_agreement_no"` // 商户自定义签约号
}

type TradeStatus string

const (
	TradeStatusWaitBuyerPay TradeStatus = "WAIT_BUYER_PAY" //（交易创建，等待买家付款）
	TradeStatusClosed       TradeStatus = "TRADE_CLOSED"   //（未付款交易超时关闭，或支付完成后全额退款）
	TradeStatusSuccess      TradeStatus = "TRADE_SUCCESS"  //（交易支付成功）
	TradeStatusFinished     TradeStatus = "TRADE_FINISHED" //（交易结束，不可退款）
)
