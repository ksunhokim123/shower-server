package main

import (
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

var routes *mux.Router

func startServer() {
	routes = mux.NewRouter()
	startAPI()
	startListen()
	corsObj := handlers.AllowedOrigins([]string{"*"})
	corsObj2 := handlers.AllowedHeaders([]string{"authorization"})
	http.ListenAndServe("127.0.0.1:5697", handlers.CORS(corsObj, corsObj2)(routes))
}

func main() {
	startServer()
}
