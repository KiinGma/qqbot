package wsclient

import "kiingma/cmd/qqbot/models"

// SendFriendMessageWithString 发送好友消息
func (c *Client) SendFriendMessageWithString(qq uint64, msg string) {
	mcs := make([]models.MessageChain, 0)
	mcs = append(mcs, models.MessageChain{Type: "Plain", Text: msg})

	content := models.Content{
		Target:       qq,
		SessionKey:   c.Session,
		MessageChain: mcs,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    "sendFriendMessage",
	}
	c.Send <- ms.ToJson()
}
