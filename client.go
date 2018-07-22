package main

import (
	"fmt"
	"net/http"
	"strings"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader websocket.Upgrader

func init() {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}
}

type Clients struct {
	mu      sync.RWMutex
	clients map[string]Client
}

var clients Clients

func init() {
	clients = Clients{
		clients: make(map[string]Client),
	}
}

func (cc *Clients) GetIds() []string {
	cc.mu.RLock()
	defer cc.mu.RUnlock()

	out := make([]string, 0, len(cc.clients))
	for id := range cc.clients {
		out = append(out, id)
	}
	return out
}

func (cc *Clients) GetByID(id string) (Client, error) {
	cc.mu.RLock()
	defer cc.mu.RUnlock()

	if cli, ok := cc.clients[id]; ok {
		return cli, nil
	}
	return Client{}, fmt.Errorf("no such client")
}

func (cc *Clients) Connect(id string) error {
	cc.mu.Lock()
	defer cc.mu.Unlock()

	if _, ok := cc.clients[id]; ok {
		return fmt.Errorf("already exists")
	}

	cc.clients[id] = Client{
		ID:        id,
		Documents: make(map[string]string),
	}

	return nil
}

func (cc *Clients) Disconnect(id string) error {
	cc.mu.Lock()
	defer cc.mu.Unlock()

	if _, ok := cc.clients[id]; !ok {
		return fmt.Errorf("no such client")
	}

	delete(cc.clients, id)
	return nil
}

func (cc *Clients) SetDoucment(id string, name string, content string) error {
	cc.mu.Lock()
	defer cc.mu.Unlock()

	if cli, ok := cc.clients[id]; ok {
		cli.Documents[name] = content
		return nil
	}
	return fmt.Errorf("no such client")
}

type Client struct {
	ID        string
	Documents map[string]string
}

func listen(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Print("upgrade:", err)
		return
	}
	defer c.Close()

	var id string
	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			fmt.Println("read:", err)
			break
		}

		if len(message) >= 10000 {
			fmt.Println("exceed")
			continue
		}

		arr := strings.Split(string(message), "\n")
		if len(arr) < 3 {
			fmt.Println("min")
			continue
		}

		if id == "" {
			if arr[0] == "" {
				continue
			}

			id = arr[0]
			err := clients.Connect(id)
			if err != nil {
				return
			}
			defer clients.Disconnect(id)
		}

		clients.SetDoucment(id, arr[1], strings.Join(arr[2:], "\n"))
	}
}
