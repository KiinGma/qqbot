package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/pkoukk/tiktoken-go"
	"github.com/sashabaranov/go-openai"
	"golang.org/x/net/context"
	"gorm.io/gorm"
	"io"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/global/consts"
	"kiingma/cmd/chatgpt/global/errnos"
	"kiingma/cmd/chatgpt/middleware/jwt"
	"kiingma/cmd/chatgpt/models"
	"kiingma/cmd/chatgpt/proto/rest"
	"log"
	"strings"
	"time"
)

type ChatGptHandler struct {
	ds         datastore.DataStore
	grpcClient rest.ChatGptServiceClient
	uih        *UserIntegrateHandler
}

func NewChatGptHandler(ds datastore.DataStore, grpcClient rest.ChatGptServiceClient, uih *UserIntegrateHandler) *ChatGptHandler {
	return &ChatGptHandler{
		ds:         ds,
		grpcClient: grpcClient,
		uih:        uih,
	}
}

//初定 1rmb=20000 tokens

func (h *ChatGptHandler) ChatCompletion(c *gin.Context, body []byte) {
	req := Json2ChatCompletionRequest(body)
	reqToken := NumTokensFromMessages(req.Messages, req.Model)
	//查询用户余额

	val, ex := c.Get("token")
	if !ex {
		errnos.ErrorTokenAuthFail(c)
		return
	}
	cc := val.(jwt.CustomClaims)
	ui := models.UserIntegrate{}
	ui.UserID = cc.UserId
	err := h.ds.Common().GetFirst(&ui)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			errnos.ErrorTokenAuthFail(c)
			return
		}
		errnos.ErrorDb(c, err.Error())
		return
	}
	if ui.Amount < int64(reqToken) || ui.Amount <= 0 {
		errnos.ErrorInsufficientBalance(c, ui.ExternalID)
		return
	}
	ui.Amount -= int64(reqToken)
	if ui.Amount < consts.TokensLimit {
		req.MaxTokens = int(ui.Amount)
	}
	ccm := openai.ChatCompletionMessage{}
	if req.Stream {
		ccm = h.ChatCompletionStream(c, string(ChatCompletionRequest2Json(req)))
	} else {
		resp, err := h.grpcClient.GetChat(c, &rest.ChatGptRequest{
			Request: string(ChatCompletionRequest2Json(req)),
		})
		if err != nil {
			errnos.Fail(c)
			return
		}
		res := models.ChatGptResponse{}
		_ = json.Unmarshal([]byte(resp.Response), &res)
		ccm.Content = res.Choices[0].Message.Content
		c.JSON(200, res)
	}
	ccm.Role = openai.ChatMessageRoleAssistant
	ccs := make([]openai.ChatCompletionMessage, 1)
	ccs[0] = ccm
	respToken := NumTokensFromMessages(ccs, req.Model)
	err = h.uih.DeductFee(ui, int64(respToken))
	if err != nil {
		errnos.ErrorDb(c, err.Error())
		return
	}
}

func (h *ChatGptHandler) ChatCompletionStream(c *gin.Context, body string) openai.ChatCompletionMessage {
	ccm := openai.ChatCompletionMessage{}
	c.Header("Content-Type", "text/event-stream")
	chanStream := make(chan string, 10)
	defer func() {
		close(chanStream)
	}()
	go getCompletionsStream(h.grpcClient, body, chanStream)
	data := errnos.Data{}
	c.Stream(func(w io.Writer) bool {
		select {
		case msg := <-chanStream:
			if msg == "<!finish>" {
				c.SSEvent("stop", "[DONE]")
				return false
			}
			if msg == "<!error>" {
				ccm = openai.ChatCompletionMessage{}
				c.SSEvent("stop", "error")
				return false
			}
			data.Msg = msg
			c.SSEvent("message", data)

			ccm.Content += msg
			return true
		}
	})

	return ccm
}

func getCompletionsStream(client rest.ChatGptServiceClient, reqBody string, chanStream chan string) {
	defer func() {
		if err := recover(); err != nil {
			log.Println(err)
		}
	}()
	ctx, cancel := context.WithTimeout(context.Background(), 180*time.Second)
	defer cancel()
	stream, err := client.GetChatStream(ctx, &rest.ChatGptRequest{Request: reqBody})
	if err != nil {
		fmt.Println(err)
		chanStream <- "<!error>"
		return
	}
	for {
		feature, err := stream.Recv()
		fmt.Println(feature.Response)
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println(err)
			chanStream <- "<!error>"
			return
		}
		chanStream <- feature.Response

		if feature.Response == "<!finish>" {
			break
		}
	}
}

func ChatCompletionRequest2Json(req *openai.ChatCompletionRequest) []byte {
	data, _ := json.Marshal(req)
	return data
}

func Json2ChatCompletionRequest(data []byte) *openai.ChatCompletionRequest {
	req := openai.ChatCompletionRequest{}
	_ = json.Unmarshal(data, &req)
	return &req
}

//

func NumTokensFromMessages(messages []openai.ChatCompletionMessage, model string) (numTokens int) {
	tkm, err := tiktoken.EncodingForModel(model)
	if err != nil {
		err = fmt.Errorf("encoding for model: %v", err)
		log.Println(err)
		return
	}

	var tokensPerMessage, tokensPerName int
	switch model {
	case "gpt-3.5-turbo-0613",
		"gpt-3.5-turbo-16k-0613",
		"gpt-4-0314",
		"gpt-4-32k-0314",
		"gpt-4-0613",
		"gpt-4-32k-0613":
		tokensPerMessage = 3
		tokensPerName = 1
	case "gpt-3.5-turbo-0301":
		tokensPerMessage = 4 // every message follows <|start|>{role/name}\n{content}<|end|>\n
		tokensPerName = -1   // if there's a name, the role is omitted
	default:
		if strings.Contains(model, "gpt-3.5-turbo") {
			log.Println("warning: gpt-3.5-turbo may update over time. Returning num tokens assuming gpt-3.5-turbo-0613.")
			return NumTokensFromMessages(messages, "gpt-3.5-turbo-0613")
		} else if strings.Contains(model, "gpt-4") {
			log.Println("warning: gpt-4 may update over time. Returning num tokens assuming gpt-4-0613.")
			return NumTokensFromMessages(messages, "gpt-4-0613")
		} else {
			err = fmt.Errorf("num_tokens_from_messages() is not implemented for model %s. See https://github.com/openai/openai-python/blob/main/chatml.md for information on how messages are converted to tokens.", model)
			log.Println(err)
			return
		}
	}

	for _, message := range messages {
		numTokens += tokensPerMessage
		numTokens += len(tkm.Encode(message.Content, nil, nil))
		numTokens += len(tkm.Encode(message.Role, nil, nil))
		numTokens += len(tkm.Encode(message.Name, nil, nil))
		if message.Name != "" {
			numTokens += tokensPerName
		}
	}
	numTokens += 3 // every reply is primed with <|start|>assistant<|message|>
	return numTokens
}
