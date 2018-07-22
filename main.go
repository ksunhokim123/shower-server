package main

import (
	"fmt"
	"net/http"
)

func main() {
	routes := createRouter()
	fmt.Println("Running :5697")
	err := http.ListenAndServe(":5697", routes)
	if err != nil {
		fmt.Println(err)
	}
}
