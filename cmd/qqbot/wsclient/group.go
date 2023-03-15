package wsclient

import (
	"encoding/json"
	"github.com/tidwall/gjson"
	"qqbot/cmd/qqbot/models"
)

// SendGroupMessage 发送群消息
func (c *Client) SendGroupMessage(target uint64, messages []models.MessageChain) {
	c.SeadMessage(target, "sendGroupMessage", messages)
}

// Mute 禁言成员
func (c *Client) Mute(gid, qq uint64, time int) {
	content := models.Content{
		Target:     gid,
		SessionKey: c.Session,
		MemberId:   qq,
		Time:       time,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    "mute",
	}
	c.Send <- ms.ToJson()
}

// Unmute 禁言成员
func (c *Client) Unmute(gid, qq uint64) {
	content := models.Content{
		Target:     gid,
		SessionKey: c.Session,
		MemberId:   qq,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    "unmute",
	}
	c.Send <- ms.ToJson()
}

// GetFileInfo 获取群文件
func (c *Client) GetFileInfo(gid uint64, id string) {
	content := models.Content{
		Target:           gid,
		SessionKey:       c.Session,
		Id:               id,
		WithDownloadInfo: true,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    "file_info",
	}
	c.Send <- ms.ToJson()
}

func (c *Client) SendGroupMessageWithString(groupId uint64, at uint64, msg string) {
	mcs := make([]models.MessageChain, 0)
	if at != 0 {
		mcs = append(mcs, models.MessageChain{
			Type:   "At",
			Target: at,
		})
	}
	mcs = append(mcs, models.MessageChain{Type: "Plain", Text: msg})
	c.SeadMessage(groupId, "sendGroupMessage", mcs)
}

func (c *Client) SendDice(groupId uint64, at uint64, value int64) {
	mcs := make([]models.MessageChain, 0)
	if at != 0 {
		mcs = append(mcs, models.MessageChain{
			Type:   "At",
			Target: at,
		})
	}
	mcs = append(mcs, models.MessageChain{Type: "Dice", Value: value})
	c.SeadMessage(groupId, "sendGroupMessage", mcs)
}

// SendTempMessage 发送临时消息
func (c *Client) SendTempMessage(target, qq uint64, messages []models.MessageChain) {
	content := models.Content{
		Group:        target,
		SessionKey:   c.Session,
		Qq:           qq,
		MessageChain: messages,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    "sendTempMessage",
	}
	c.Send <- ms.ToJson()
}

// MemberList 获取群列表
func (c *Client) MemberList(target uint64) models.RespMessage {
	c.SeadMessage(target, "memberList", nil)
	m := <-c.Read
	resp := models.RespMessage{}
	resp.ToRespMessage(m)
	return resp
}

// MessageFromId 根据id获取消息
func (c *Client) MessageFromId(id int64, target uint64) {
	content := models.Content{
		Target:     target,
		SessionKey: c.Session,
		MessageId:  id,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    "messageFromId",
	}
	c.Send <- ms.ToJson()
	m := <-c.Read
	chain := gjson.GetBytes(m, "data.data.messageChain").String()
	chains := make([]models.MessageChain, 0)
	json.Unmarshal([]byte(chain), &chains)
	if len(chains) > 1 {
		c.SeadMessage(target, "sendGroupMessage", chains[1:])
	}
}

func (c *Client) GetMessageFromId(id int64, target uint64) []models.MessageChain {
	content := models.Content{
		Target:     target,
		SessionKey: c.Session,
		MessageId:  id,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    "messageFromId",
	}
	c.Send <- ms.ToJson()
	m := <-c.Read
	chain := gjson.GetBytes(m, "data.data.messageChain").String()
	chains := make([]models.MessageChain, 0)
	json.Unmarshal([]byte(chain), &chains)
	return chains
}

//获取某个群成员信息

func (c *Client) GetMemberProfile(target, memberId uint64) {
	content := models.Content{
		Target:     target,
		SessionKey: c.Session,
		MemberId:   memberId,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    "memberProfile",
	}
	c.Send <- ms.ToJson()
	m := <-c.Read
	chain := gjson.GetBytes(m, "data.data.messageChain").String()
	chains := make([]models.MessageChain, 0)
	json.Unmarshal([]byte(chain), &chains)
	c.SeadMessage(target, "sendGroupMessage", chains[1:])
}
