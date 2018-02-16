package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{} // use default options
func startListen() {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}
	routes.HandleFunc("/listen", listen)
}

type ClientContainer []*Client

var clients ClientContainer

func (cc *ClientContainer) GetByID(id string) *Client {
	for _, val := range *cc {
		if val.ID == id {
			return val
		}
	}
	return nil
}

func (cc *ClientContainer) Connect(id string) *Client {
	for _, val := range *cc {
		if val.ID == id {
			return nil
		}
	}
	cli := &Client{
		ID:        id,
		Documents: make(map[string]string),
		Container: cc,
	}
	*cc = append(*cc, cli)
	return cli
}

func (cc *ClientContainer) Disconnect(id string) {
	for index, val := range *cc {
		if val.ID == id {
			*cc = append((*cc)[:index], (*cc)[index+1:]...)
		}
	}
}

type Client struct {
	ID        string
	Documents map[string]string
	Container *ClientContainer
}

func (cli *Client) Disconnect() {
	cli.Container.Disconnect(cli.ID)
}

func listen(w http.ResponseWriter, r *http.Request) {
	var client *Client = nil
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Print("upgrade:", err)
		return
	}
	defer c.Close()
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
		if client == nil {
			cli := clients.Connect(arr[0])
			if cli == nil {
				return
			}
			defer cli.Disconnect()
			client = cli
		}
		client.Documents[arr[1]] = strings.Join(arr[2:], "\n")
	}
}
