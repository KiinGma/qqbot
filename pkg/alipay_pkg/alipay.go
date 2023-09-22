package alipay_pkg

import (
	"fmt"
	"github.com/smartwalle/alipay/v3"
	"kiingma/pkg/appconfig"
)

var client *alipay.Client

// 未加锁

func GetAlipayClient() (*alipay.Client, error) {
	if client == nil {
		c, err := NewAlipayClient()
		if err != nil {
			return nil, err
		}
		client = c
	}
	return client, nil
}

func NewAlipayClient() (*alipay.Client, error) {
	config := appconfig.LoadConfig()
	c, err := alipay.New(config.AlipayAppId, config.AlipayPriKey, true)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	err = c.LoadAliPayPublicKey(config.AlipayPubKey)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	err = c.SetEncryptKey(config.AlipayEncryptKey)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return c, nil
}
