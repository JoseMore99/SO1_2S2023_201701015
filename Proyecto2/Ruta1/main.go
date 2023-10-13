package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Estructura de datos para un mensaje
type Message struct {
	Text string `json:"message"`
}

func main() {
	// Crear un enrutador Mux
	r := mux.NewRouter()

	// Manejador para la ruta raíz ("/")
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		message := Message{Text: "¡Hola, mundo!"}

		jsonData, err := json.Marshal(message)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonData)
	}).Methods("GET")

	r.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode("{message:\"api en golang\"}")

	})
	// Iniciar el servidor en el puerto 8080
	fmt.Println("Servidor escuchando en el puerto 8080")
	http.Handle("/", r)
	handler := cors.Default().Handler(r)
	http.ListenAndServe(":8080", handler)
}
