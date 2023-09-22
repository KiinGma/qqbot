package models

import (
	"encoding/json"
	"fmt"
)

type ChatGpt struct {
	Model    string           `json:"model"`
	Messages []ChatGptMessage `json:"messages"`
}

type ChatGptMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatGptErrorMessage struct {
	Message string `json:"message"`
	Type    string `json:"type"`
	Param   string `json:"param"`
	Code    string `json:"code"`
}
type ChatGptChoices struct {
	Message      ChatGptMessage `json:"message"`
	FinishReason string         `json:"finish_reason"`
	Index        int            `json:"index"`
}

type ChatGptResponse struct {
	Error   ChatGptErrorMessage `json:"error"`
	Id      string              `json:"id"`
	Object  string              `json:"object"`
	Created int                 `json:"created"`
	Model   string              `json:"model"`
	Choices []ChatGptChoices    `json:"choices"`
	Usage   ChatGptUsage        `json:"usage"`
}

type ChatGptUsage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}

func (c *ChatGpt) ToJson() []byte {
	data, _ := json.Marshal(c)
	return data
}

func (c *ChatGpt) ToJsonString() string {
	data, _ := json.Marshal(c)
	return string(data)
}

func (c *ChatGptResponse) ToJson(data []byte) {
	err := json.Unmarshal(data, c)
	if err != nil {
		fmt.Println(err)
		return
	}
}

func (c *ChatGptResponse) ToStruct() []byte {
	data, _ := json.Marshal(c)
	return data
}

func (c *ChatGptResponse) ToJsonString() string {
	data, _ := json.Marshal(c)
	return string(data)
}
