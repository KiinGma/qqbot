package wsservice

import "fmt"

// WSHub maintains the set of active clients and broadcasts messages to the
// clients.
type WSHub struct {
	// Registered clients.
	Clients map[*Client]bool

	// Inbound messages from the clients.
	// broadcast chan []byte
	Broadcast chan *Message

	// Register requests from the clients.
	Register chan *Client

	// Unregister requests from clients.
	Unregister chan *Client

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
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
	}
}

func (h *WSHub) Run() {
	for {
		select {
		case client := <-h.Register:

			h.Clients[client] = true
		case client := <-h.Unregister:

			if _, ok := h.Clients[client]; ok {
				delete(h.Clients, client)
				close(client.Send)
			}
		case message := <-h.Broadcast:

			fmt.Println("enter message broadcast")
			for client := range h.Clients {
				if client.ID == message.ID {
					client.Send <- message.Data
				}
				// select {
				// case client.send <- message:
				// default:
				// 	close(client.send)
				// 	delete(h.clients, client)
				// }
			}
		}
	}
}
