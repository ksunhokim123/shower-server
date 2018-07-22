package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

var (
	Username = os.Getenv("USER")
	Password = os.Getenv("PASS")
)

func use(h http.HandlerFunc, middleware ...func(http.HandlerFunc) http.HandlerFunc) http.HandlerFunc {
	for _, m := range middleware {
		h = m(h)
	}
	return h
}

func createRouter() http.Handler {
	routes := mux.NewRouter()
	api := routes.PathPrefix("/api").Subrouter()
	api.HandleFunc("/clients", use(retrieveClients, basicAuth)).Methods("GET")
	api.HandleFunc("/clients/{id:[0-9]+}", use(getClient, basicAuth)).Methods("GET")
	routes.HandleFunc("/listen", listen)

	routes.PathPrefix("/assets/").Handler(
		http.StripPrefix("/assets/", http.FileServer(http.Dir("dist/"))),
	)
	routes.HandleFunc("/", index)

	return handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedHeaders([]string{"Authorization"}),
	)(routes)
}

func index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>shower admin</title>
	<link rel="stylesheet" type="text/css" href="assets/bundle.css">
  </head>
  <body>
  <script type="text/javascript" src="assets/bundle.js"></script></body>
</html>
	`)
}

func basicAuth(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
		username, password, authOK := r.BasicAuth()
		if authOK == false {
			http.Error(w, "Not authorized", 401)
			return
		}

		if username != Username || password != Password {
			http.Error(w, "Not authorized", 401)
			return
		}

		h.ServeHTTP(w, r)
	}
}

func retrieveClients(w http.ResponseWriter, r *http.Request) {
	response := clients.GetIds()
	json.NewEncoder(w).Encode(response)
}

func getClient(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	client, err := clients.GetByID(params["id"])
	if err != nil {
		http.Error(w, "invalid client", 400)
		return
	}
	json.NewEncoder(w).Encode(client.Documents)
}
