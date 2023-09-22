package wsclient

import (
	"fmt"
	"github.com/gorilla/websocket"
	"kiingma/cmd/qqbot/models"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"time"
)

type Client struct {
	// The websocket connection.
	Conn *websocket.Conn

	Session string

	Send chan []byte

	open bool

	Read chan []byte
}

var client Client
var clientLock sync.Mutex

func GetClient() *Client {
	if !client.open {
		time.Sleep(time.Second)
		GetClient()
	}
	clientLock.Lock()
	defer clientLock.Unlock()
	return &client
}

func WSClient(urlStr string, requestHeader http.Header) {
	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)
	c, _, err := websocket.DefaultDialer.Dial(urlStr, requestHeader)
	if err != nil {
		log.Fatal("dial:", err)
	}
	fmt.Println("连接成功")
	defer c.Close()

	client = Client{
		open: true,
		Conn: c,
		Read: make(chan []byte),
		Send: make(chan []byte),
	}

	go client.ReadPump()
	client.SendPump(interrupt)

}

func (c *Client) ReadPump() {
	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
		}
		fmt.Printf("recv: %s", message)
		c.Read <- message
	}
}

func (c *Client) SeadMessage(target uint64, command string, messages []models.MessageChain) {
	content := models.Content{
		Target:       target,
		SessionKey:   c.Session,
		MessageChain: messages,
	}

	ms := models.Message{
		Content:    content,
		SyncId:     0,
		SubCommand: nil,
		Command:    command,
	}
	c.Send <- ms.ToJson()
}

func (c *Client) SendPump(interrupt chan os.Signal) {
	for {
		select {
		case m := <-c.Send:
			err := c.Conn.WriteMessage(websocket.TextMessage, m)
			if err != nil {
				log.Println("write:", err)
				return
			}
			fmt.Println("发送成功")
		case <-interrupt:
			log.Println("interrupt")
			err := c.Conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
			if err != nil {
				log.Println("write close:", err)
				return
			}
			select {
			case <-time.After(time.Second):
			}
			return
		}
	}
}
