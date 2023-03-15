package models

import "encoding/json"

type ChatGpt struct {
	Model    string           `json:"model"`
	Messages []ChatGptMessage `json:"messages"`
}

type ChatGptMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

func (c *ChatGpt) ToJson() []byte {
	data, _ := json.Marshal(c)
	return data
}

func (c *ChatGpt) ToJsonString() string {
	data, _ := json.Marshal(c)
	return string(data)
}
