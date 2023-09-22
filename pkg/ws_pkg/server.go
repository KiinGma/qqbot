package ws_pkg

import (
	"bytes"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

type Server struct {
	Hub *WSHub

	// The websocket Connection.
	Conn *websocket.Conn

	// Buffered channel of outbound messages.
	Send chan []byte

	// server token
	ID string
}

type WSHub struct {
	// Registered Servers.
	Servers map[*Server]bool

	// Inbound messages from the Servers.
	// broadcast chan []byte
	Broadcast chan *Message

	// Register requests from the Servers.
	Register chan *Server

	// UnRegister requests from Servers.
	UnRegister chan *Server

	// database model
	// models *models.Models
}

type Message struct {
	ID   string
	Data []byte
}

func NewHub() *WSHub {
	return &WSHub{
		// broadcast:  make(chan []byte),
		Broadcast:  make(chan *Message),
		Register:   make(chan *Server),
		UnRegister: make(chan *Server),
		Servers:    make(map[*Server]bool),
	}
}

func (h *WSHub) Run() {
	for {
		select {
		case server := <-h.Register:
			h.Servers[server] = true

		case server := <-h.UnRegister:
			if _, ok := h.Servers[server]; ok {
				delete(h.Servers, server)
				close(server.Send)
			}

		case message := <-h.Broadcast:
			fmt.Println("enter message broadcast")
			for server := range h.Servers {
				if server.ID == message.ID {
					server.Send <- message.Data
				}
				// select {
				// case server.Send <- message:
				// default:
				// 	close(server.Send)
				// 	delete(h.Servers, server)
				// }
			}
		}
	}
}

func (c *Server) ReadPump() {
	defer func() {
		c.Hub.UnRegister <- c
		c.Conn.Close()
	}()
	c.Conn.SetReadLimit(maxMessageSize)
	c.Conn.SetReadDeadline(time.Now().Add(pongWait))
	c.Conn.SetPongHandler(func(string) error { c.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))

		// var invoiceInfo GetInvoiceStatus
		// json.Unmarshal(message, &invoiceInfo)

		// c.ID = token.ResourceID
		fmt.Println("message: ", string(message))
		// c.Hub.broadcast <- message
	}
}

func (c *Server) WritePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.Send:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The Hub closed the channel.
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(c.Send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.Send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

var Upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}
