package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

const USERNAME = "test"
const PASSWORD = "test"

type ClientsResponse struct {
	Clients []string `json:"clients"`
}

type ClientResponse struct {
	DocumentNames []string          `json:"names"`
	DocumentData  map[string]string `json:"data"`
}

func startAPI() {
	routes.HandleFunc("/api/clients", use(retrieveClients, basicAuth)).Methods("GET")
	routes.HandleFunc("/", corsHandler()).Methods("OPTIONS")
	routes.HandleFunc("/api/clients/{id:[0-9]+}", use(getClient, basicAuth)).Methods("GET")
}

func use(h http.HandlerFunc, middleware ...func(http.HandlerFunc) http.HandlerFunc) http.HandlerFunc {
	for _, m := range middleware {
		h = m(h)
	}
	return h
}
func corsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Headers", " authorization")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Println("asdad")
	}
}

func basicAuth(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
		username, password, authOK := r.BasicAuth()
		if authOK == false {
			http.Error(w, "Not authorized", 401)
			return
		}
		if username != USERNAME || password != PASSWORD {
			http.Error(w, "Not authorized", 401)
			return
		}
		h.ServeHTTP(w, r)
	}
}

func retrieveClients(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Pragma", "no-cache")
	response := ClientsResponse{
		Clients: []string{},
	}

	for _, val := range clients {
		response.Clients = append(response.Clients, val.ID)
	}
	output, _ := json.Marshal(response)
	fmt.Fprintln(w, string(output))
}

func getClient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Pragma", "no-cache")
	response := ClientResponse{
		DocumentData:  make(map[string]string),
		DocumentNames: []string{},
	}
	params := mux.Vars(r)
	client := clients.GetByID(params["id"])
	if client == nil {
		return
	}
	for name, val := range client.Documents {
		response.DocumentData[name] = val
		response.DocumentNames = append(response.DocumentNames, name)
	}
	output, _ := json.Marshal(response)
	fmt.Fprintln(w, string(output))
}
