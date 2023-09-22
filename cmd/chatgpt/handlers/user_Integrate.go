package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/global/consts"
	"kiingma/cmd/chatgpt/global/errnos"
	"kiingma/cmd/chatgpt/middleware/jwt"
	"kiingma/cmd/chatgpt/models"
	"kiingma/pkg/alipay_pkg"
	"kiingma/pkg/appconfig"
	"strconv"
	"sync"
)

// 全局锁
var mus map[uint64]sync.Mutex

type UserIntegrateHandler struct {
	ds datastore.DataStore
	mu *sync.Mutex
	lh *LedgerHandler
}

func NewUserIntegrateHandler(ds datastore.DataStore) *UserIntegrateHandler {
	return &UserIntegrateHandler{
		ds: ds,
		lh: NewLedgerHandler(ds),
		mu: &sync.Mutex{},
	}
}

//获取余额

func (h *UserIntegrateHandler) GetBalance(c *gin.Context) {
	val, ex := c.Get("token")
	if !ex {
		errnos.ErrorTokenAuthFail(c)
		return
	}
	token := val.(jwt.CustomClaims)
	userId := token.UserId
	if userId == 0 {
		errnos.ErrorTokenAuthFail(c)
		return
	}
	ui := models.UserIntegrate{UserID: userId}

	err := h.ds.Common().GetFirst(&ui)
	if err != nil {
		errnos.ErrorUserNotFound(c)
		return
	}
	errnos.Success(c, ui.Amount)
}

//消费

func (h *UserIntegrateHandler) AddFee(uerId uint64, integrate int64) error {
	//锁住账户
	lock := h.getUserLock(uerId)
	lock.Lock()
	defer lock.Unlock()
	ui := models.UserIntegrate{}
	ui.UserID = uerId
	err := h.ds.Common().GetFirst(&ui)
	if err != nil {
		fmt.Println(err)
		return err
	}
	ui.Amount += integrate
	err = h.ds.Common().Update(nil, &ui)
	if err != nil {
		return err
	}
	return err
}

func (h *UserIntegrateHandler) DeductFee(ui models.UserIntegrate, integrate int64) error {
	//锁住账户
	lock := h.getUserLock(ui.UserID)
	lock.Lock()
	defer lock.Unlock()

	if integrate > ui.Amount {
		ui.Amount = 0
	} else {
		ui.Amount -= integrate
	}
	err := h.ds.Common().Update(nil, &ui)
	if err != nil {
		return err
	}
	return err
}

//充值

func (h *UserIntegrateHandler) Deposit(c *gin.Context) {
	//获取充值的id.引用的是外部id
	externalID := c.Param("externalID")
	if externalID == "" {
		errnos.ErrorUserNotFound(c)
		return
	}
	//校验id是否存在数据库
	user := models.UserIntegrate{}
	user.ExternalID = externalID
	err := h.ds.Common().GetFirst(&user)
	if err != nil {
		errnos.ErrorUserNotFound(c)
		return
	}
	//锁定账户
	lock := h.getUserLock(user.UserID)
	lock.Lock()
	defer lock.Unlock()
	//获取充值金额
	amount := c.Param("amount")
	//todo 有问题
	amountInt, err := strconv.ParseInt(amount, 10, 64)
	if err != nil {
		errnos.ErrorAmount(c)
		return
	}
	if amountInt > consts.ExcessiveAmount || amountInt < 1 {
		errnos.ErrorExcessiveAmount(c)
		return
	}
	//查询是否有未过期且未付款的二维码
	l, err := h.lh.GetUnpaidSystemLedger(user.ID)
	if err != nil {
		errnos.ErrorDb(c, err.Error())
		return
	}
	if l.UserId == 0 {
		//获取二维码
		l, err = GetAlipayPageLink(user.UserID, amountInt)
		if err != nil {
			errnos.ErrorAlipayServer(c, err.Error())
			return
		}
		//存入订单
		err = h.lh.AddSystemLedger(l)
		if err != nil {
			errnos.ErrorDb(c, err.Error())
			return
		}
	}
	c.Redirect(301, l.PayLink)
}

///return?
//charset=utf-8
//&out_trade_no=a6ccd28d-3cc8-11ee-a0e7-525400d2b3c3
//&method=alipay.trade.page.pay.return
//&total_amount=1.00
//&sign=Q71o%2BksNvuwcvf3cn8d3ZgxPHjGsDzFCMGReJReFxbEdEwo6KmamSY6xM8gGuL7EocYWNvapybS%2F2bjqStbyHHQfLBh2OWHVXmTP8PYnxzZxS1rdHUoXgabV8y%2FwoVy68OwZ2s2ytaOy88snSFm0vUU5Qehj5uT3uGwFgW%2FMnuXbImoTDZYFxN5szyM3oc3lYKq6rh0ximTfTVibJqTu5nxazU088EEi6KzAmJDR6lIfhT06WT5teiKGzu4KqAcSH2OKeYF6KNtufvDUlH%2BOa79iGTXHMg6I%2FGYo5yiqV36ovVMtTI9TmeZCvP8wDpzqUnnHpNRFlt8YPKzv2eZPBA%3D%3D
//&trade_no=2023081722001411391436558959
//&auth_app_id=2021003182635101
//&version=1.0
//&app_id=2021003182635101
//&sign_type=RSA2
//&seller_id=2088822687391338
//&timestamp=2023-08-17+14%3A38%3A35

func (h *UserIntegrateHandler) Return(c *gin.Context) {
	c.Redirect(301, "/paySuccess")
}

// 接收支付结果,notify
func (h *UserIntegrateHandler) Notify(c *gin.Context) {
	config := appconfig.LoadConfig()
	client, err := alipay_pkg.GetAlipayClient()
	if err != nil {
		fmt.Println("支付宝服务不可用")
		c.String(200, "error")
		return
	}
	noti := models.TradeNotification{}
	err = c.Bind(&noti)
	if err != nil {
		fmt.Println(err)
		c.String(200, "error")
		return
	}
	//验证信息可靠
	signVerified := client.NotifyVerify(config.AlipayPartnerId, noti.NotifyId)
	fmt.Println(signVerified)
	//获取订单号
	//根据订单号找到付款信息
	l := models.Ledger{}
	l.OutTradeNo = noti.OutTradeNo
	err = h.ds.Common().GetFirst(&l)
	if err != nil {
		fmt.Println(err)
		return
	}
	//从订单记录找到付款的user
	//充值
	//计算倍率
	pa, _ := strconv.ParseFloat(noti.BuyerPayAmount, 64)
	amount := int64(consts.ConversionRate * pa)
	err = h.ds.Atomic(func(ds datastore.DataStore) error {
		err = h.AddFee(l.UserId, amount)
		if err != nil {
			return err
		}
		//记账
		l.TradeNotification2Ledger(&noti)
		err = h.ds.Common().Update(nil, &l)
		return err
	})
	if err != nil {
		c.String(200, "error")
	}
	//充值成功
	c.String(200, "success")
}

func (h *UserIntegrateHandler) getUserLock(userId uint64) *sync.Mutex {
	h.mu.Lock()
	defer h.mu.Unlock()

	lock, ok := mus[userId]
	if !ok {
		if mus == nil {
			mus = map[uint64]sync.Mutex{}
		}
		mus[userId] = sync.Mutex{}
	}
	return &lock
}
