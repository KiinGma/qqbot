package alipay_pkg

import (
	"fmt"
	"github.com/smartwalle/alipay/v3"
	"qqbot/pkg/appconfig"
)

var client *alipay.Client

// 未加锁

func GetAlipayClient() *alipay.Client {
	if client == nil {
		client = NewAlipayClient()
	}
	return client
}

func NewAlipayClient() *alipay.Client {
	config := appconfig.LoadCPGConfig()
	c, err := alipay.New(config.AlipayAppId, config.AlipayPriKey, true)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	err = c.LoadAliPayPublicKey(config.AlipayPubKey)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	err = c.SetEncryptKey(config.AlipayEncryptKey)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return c
}
