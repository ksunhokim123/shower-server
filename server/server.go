package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

var routes *mux.Router

func startServer() {
	routes = mux.NewRouter()
	startAPI()
	startListen()
	http.ListenAndServe(":80", routes)
}

func main() {
	startServer()
}
