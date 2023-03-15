package models

import "encoding/json"

type RespMessage struct {
	SyncId string  `json:"syncId"`
	Data   Message `json:"data"`
}

type Sender struct {
	Id                 uint64 `json:"id"`
	MemberName         string `json:"memberName"`
	SpecialTitle       string `json:"specialTitle"`
	Permission         string `json:"permission"`
	JoinTimestamp      int    `json:"joinTimestamp"`
	LastSpeakTimestamp int    `json:"lastSpeakT    imestamp"`
	MuteTimeRemaining  int    `json:"muteTimeRemaining"`
	Group              Group  `json:"group"`
}

type Group struct {
	Id         uint64 `json:"id"`
	Name       string `json:"name"`
	Permission string `json:"permission"`
}

type Message struct {
	MemberList   []MemberList   `json:"data"`
	SyncId       int            `json:"syncId"`
	Command      string         `json:"command"`
	SubCommand   interface{}    `json:"subCommand"`
	Type         string         `json:"type"`
	MessageChain []MessageChain `json:"messageChain"`
	Content      Content        `json:"content"`
	Sender       Sender         `json:"sender"`
}

type Content struct {
	SessionKey       string         `json:"sessionKey"`
	Target           uint64         `json:"target,omitempty"`
	Group            uint64         `json:"group,omitempty"`
	Id               string         `json:"id,omitempty"`
	MemberId         uint64         `json:"memberId,omitempty"`
	MessageId        int64          `json:"messageId,omitempty"`
	Qq               uint64         `json:"qq,omitempty"`
	Time             int            `json:"time,omitempty"`
	WithDownloadInfo bool           `json:"withDownloadInfo"`
	MessageChain     []MessageChain `json:"messageChain,omitempty"`
}

type MessageChain struct {
	Type     string         `json:"type"`
	Text     string         `json:"text,omitempty"`
	Name     string         `json:"name,omitempty"`
	Url      string         `json:"url,omitempty"`
	Id       int64          `json:"id,omitempty"`
	Time     int            `json:"time,omitempty"`
	Target   uint64         `json:"target,omitempty"`
	Display  string         `json:"display,omitempty"`
	Value    int64          `json:"value,omitempty"`
	Path     string         `json:"path"`
	SenderId uint64         `json:"senderId,omitempty"`
	TargetId uint64         `json:"targetId,omitempty"`
	Origin   []MessageChain `json:"origin,omitempty"`
	Base64   string         `json:"base64"`
}

func (m *Message) ToJson() []byte {
	data, _ := json.Marshal(m)
	return data
}

func (rm *RespMessage) ToRespMessage(data []byte) {
	_ = json.Unmarshal(data, rm)
}

// MemberList 群成员
type MemberList struct {
	Id                 uint64 `json:"id"`
	MemberName         string `json:"memberName"`
	SpecialTitle       string `json:"specialTitle"`
	Permission         string `json:"permission"`
	JoinTimestamp      int    `json:"joinTimestamp"`
	LastSpeakTimestamp int    `json:"lastSpeakTimestamp"`
	MuteTimeRemaining  int    `json:"muteTimeRemaining"`
	Group              Group  `json:"group"`
}
