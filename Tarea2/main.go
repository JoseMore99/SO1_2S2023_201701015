package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type cod struct {
	Nombre string `json:"Nombre"`
	Carnet int    `json:"Carnet"`
}

func main() {
	fmt.Println("Iniciando api")
	router := mux.NewRouter()
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Api iniciada"))
	})
	router.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		datos := cod{"Jose Carlos Moreira Paz", 201701015}
		json.NewEncoder(w).Encode(datos)

	})
	http.ListenAndServe(":8080", router)
}
