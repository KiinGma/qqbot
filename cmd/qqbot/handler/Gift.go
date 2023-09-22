package handler

import (
	"crypto/rand"
	"kiingma/cmd/qqbot/models"
	"math/big"
)

// Gift 抽奖
func (h *WsHandler) Gift(resp models.RespMessage) {
	groupId := resp.Data.Sender.Group.Id

	//获取群列表
	memberResp := h.client.MemberList(resp.Data.Sender.Group.Id)
	result, _ := rand.Int(rand.Reader, big.NewInt(int64(len(memberResp.Data.MemberList))))

	//中奖者
	winner := memberResp.Data.MemberList[result.Int64()]

	mcs := []models.MessageChain{
		{Type: "Plain", Text: "恭喜 "},
		{
			Type:   "At",
			Target: winner.Id,
		},
		{Type: "Plain", Text: " 中奖"},
	}
	h.client.SendGroupMessage(groupId, mcs)
	//发送中奖名单

}
