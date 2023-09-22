package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/sashabaranov/go-openai"
	"github.com/tidwall/gjson"
	"io"
	"kiingma/cmd/chatgpt/proto/rest"
)

type ChatGptStreamService struct {
	AiClient *openai.Client
}

func NewChatGptStreamService(aiClient *openai.Client) *ChatGptStreamService {
	return &ChatGptStreamService{
		aiClient,
	}
}

func (s *ChatGptStreamService) GetChat(ctx context.Context, r *rest.ChatGptRequest) (*rest.ChatGptResponse, error) {
	req := openai.ChatCompletionRequest{}
	_ = json.Unmarshal([]byte(r.Request), &req)
	res, err := s.AiClient.CreateChatCompletion(ctx, req)
	data, err := json.Marshal(res)
	if err != nil {
		fmt.Println(err)
	}
	resp := rest.ChatGptResponse{}
	resp.Response = string(data)
	return &resp, err
}

func (s *ChatGptStreamService) GetChatStream(r *rest.ChatGptRequest, stream rest.ChatGptService_GetChatStreamServer) error {
	ChatGPTStreamRequest(s.AiClient, r.Request, stream)
	return nil
}

func ChatGPTStreamRequest(client *openai.Client, reqBody string, rspStream rest.ChatGptService_GetChatStreamServer) {
	ctx := context.Background()
	req := openai.ChatCompletionRequest{}
	_ = json.Unmarshal([]byte(reqBody), &req)
	//区分是不是stream
	if req.Stream {
		stream, err := client.CreateChatCompletionStream(ctx, req)
		if err != nil {
			return
		}
		chanStream := make(chan string, 10)
		go RevChatGPTStream(stream, chanStream)
		SendChatGPTStream(rspStream, chanStream)
		if err != nil {
			fmt.Println(err)
		}
	} else {
		resp, err := client.CreateChatCompletion(ctx, req)
		if err != nil {
			fmt.Println(err)
		}
		data, err := json.Marshal(resp)
		err = rspStream.Send(&rest.ChatGptResponse{
			Response: string(data),
		})

		err = rspStream.Send(&rest.ChatGptResponse{
			Response: "<!finish>",
		})
		if err != nil {
			return
		}
		fmt.Println(resp)
	}

}

func RevChatGPTStream(stream *openai.ChatCompletionStream, chanStream chan string) {
	defer stream.Close()
	defer close(chanStream)
	for {
		response, err := stream.Recv()
		if errors.Is(err, io.EOF) {
			fmt.Println("Stream EOF")
			chanStream <- "<!finish>"
			return
		}

		if err != nil {
			fmt.Printf("Stream error: %v\n", err)
			chanStream <- "<!error>"
			return
		}
		if len(response.Choices) == 0 {
			chanStream <- "<!finish>"
			return
		}
		data, err := json.Marshal(response.Choices[0])
		chanStream <- gjson.GetBytes(data, "delta.content").String()
		fmt.Printf("Stream response: %v\n", string(data))
	}
}

//读到grpc里面去

func SendChatGPTStream(stream rest.ChatGptService_GetChatStreamServer, chanStream chan string) {
	for {
		select {
		case msg := <-chanStream:
			if msg == "<!finish>" {
				err := stream.Send(&rest.ChatGptResponse{
					Response: msg,
				})
				if err != nil {
					return
				}
			}
			if msg == "<!error>" {
				err := stream.Send(&rest.ChatGptResponse{
					Response: msg,
				})
				if err != nil {
					return
				}
			}
			err := stream.Send(&rest.ChatGptResponse{
				Response: msg,
			})
			if err != nil {
				return
			}
		}
	}
}
