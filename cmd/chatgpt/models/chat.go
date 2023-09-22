package models

import (
	"encoding/json"
	"fmt"
)

// 处理所有chat接收的结构体的

type Chat struct {
	Messages         []Message `json:"messages"`
	Stream           bool      `json:"stream"`
	Model            string    `json:"model"`
	Temperature      float64   `json:"temperature"`
	PresencePenalty  int       `json:"presence_penalty"`
	FrequencyPenalty int       `json:"frequency_penalty"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

func (c *Chat) ToString() string {
	return string(c.ToJson())
}

func (c *Chat) ToJson() []byte {
	data, err := json.Marshal(c)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return data
}
