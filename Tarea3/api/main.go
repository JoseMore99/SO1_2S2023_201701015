package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

type biblio struct {
	Id     string `json:"id"`
	Title  string `json:"title"`
	Artist string `json:"artist"`
	Year   int    `json:"year"`
	Genre  string `json:"genre"`
}

var conexion = ConectSql()

func ConectSql() *sql.DB {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")
	connectionString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", dbUser, dbPassword, dbHost, dbPort, dbName)
	retornoC, err := sql.Open("mysql", connectionString)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Conexion Realizada")
	}
	return retornoC
}

func main() {
	fmt.Println("Iniciando api")
	router := mux.NewRouter()
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Api iniciada"))
	})
	router.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		//datos := cod{"Jose Carlos Moreira Paz", 201701015}
		//json.NewEncoder(w).Encode(datos)
		w.Write([]byte("Api para data"))

	})
	router.HandleFunc("/postCanciones", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("content-type", "application/json")
		var cancion biblio
		json.NewDecoder((r.Body)).Decode(&cancion)
		query := `INSERT INTO Canciones (title, artist, year, genre) VALUES (?,?,?,?);`
		result, err := conexion.Exec(query, cancion.Title, cancion.Artist, cancion.Year, cancion.Genre)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(result)
		json.NewEncoder(w).Encode(cancion)

	}).Methods("POST")
	router.HandleFunc("/getcanciones", func(w http.ResponseWriter, r *http.Request) {
		var Canciones []biblio
		query := "SELECT * FROM Canciones;"
		result, err := conexion.Query(query)
		if err != nil {
			fmt.Println(err)
		}

		for result.Next() {
			var cancion biblio

			err = result.Scan(&cancion.Id, &cancion.Title, &cancion.Artist, &cancion.Year, &cancion.Genre)
			if err != nil {
				fmt.Println(err)
			}
			Canciones = append(Canciones, cancion)
		}
		w.Header().Add("content-type", "application/json")
		fmt.Println(Canciones)
		json.NewEncoder(w).Encode(Canciones)
	}).Methods("GET")
	handler := cors.Default().Handler(router)
	http.ListenAndServe(":8080", handler)
}
