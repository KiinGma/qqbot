package handler

import (
	"crypto/rand"
	"fmt"
	"github.com/tidwall/gjson"
	"kiingma/cmd/qqbot/models"
	"kiingma/json"
	"math/big"
	"strings"
	"time"
)

//脏话

func (h *WsHandler) Curse(groupId, senderId uint64, message string) {
	list := gjson.Get(json.Curse, "RECORDS").Array()

	result, _ := rand.Int(rand.Reader, big.NewInt(int64(len(list))))
	mcs := []models.MessageChain{
		{
			Type:   "At",
			Target: senderId,
		},
		{Type: "Plain", Text: " " + list[result.Int64()].Get("text").String()},
	}
	h.client.SendGroupMessage(groupId, mcs)
}

func (h *WsHandler) IsCurse(text string) bool {
	a := time.Now().Unix()
	for _, v := range json.Simp {
		if strings.Index(text, v) != -1 {
			fmt.Println(time.Now().Unix() - a)
			return true
		}
	}
	fmt.Println(time.Now().Unix() - a)
	return false
}
