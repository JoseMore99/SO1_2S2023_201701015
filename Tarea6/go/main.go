package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/redis/go-redis/v9"
	"github.com/rs/cors"
)

type cod struct {
	Album  string `json:"Album"`
	Artist string `json:"Artist"`
	Year   int    `json:"Year"`
}

func main() {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	// Crea un enrutador mux.
	router := mux.NewRouter()

	router.HandleFunc("/album", func(w http.ResponseWriter, r *http.Request) {
		var album cod
		json.NewDecoder((r.Body)).Decode(&album)
		fmt.Println(album.Album)

		// Creamos una variable contador, si existe se toma el valor
		counter := int(client.Incr(context.Background(), "contador_album").Val())

		// Insertamos a Redis
		key := fmt.Sprintf("album%d", counter)
		albumJSON, err := json.Marshal(album)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		err = client.Set(context.Background(), key, albumJSON, 0).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Println("Albium Registrado en Redis: ", album)
		fmt.Fprintf(w, "Se ha Registrado el Albium en Redis! (%d albums registrados)", counter)
		fmt.Fprintln(w, "¡ API en Go!")
	})

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Api iniciada"))
	})
	// Crea un servidor HTTP y especifica el enrutador como manejador.
	http.Handle("/", router)

	// Inicia el servidor en el puerto 8080.
	fmt.Println("La API está escuchando en el puerto 8080...")
	handler := cors.Default().Handler(router)
	http.ListenAndServe(":8080", handler)
}
