package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	url := "http://localhost:3000/ip"
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error al realizar la solicitud POST:", err)
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println(body)
	api()
	envios()
	select {}
}

func api() {
	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Api Funcionando!!"))
	}).Methods("GET")

	r.HandleFunc("/ram", func(w http.ResponseWriter, r *http.Request) {
		fmt.Print("Obteniendo Datos de Ram")
		cmd := exec.Command("sh", "-c", "cat /proc/ram_201701015")
		Combine, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println(err)
		}
		retorno := string(Combine[:])
		w.Write([]byte(retorno))
	}).Methods("GET")

	r.HandleFunc("/cpu", func(w http.ResponseWriter, r *http.Request) {
		fmt.Print("Obteniendo Datos de CPU")
		cmd := exec.Command("sh", "-c", "cat /proc/cpu_201701015")
		Combine, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println(err)
		}
		retorno := string(Combine[:])
		w.Write([]byte(retorno))
	}).Methods("GET")

	r.HandleFunc("/kill/{pid}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		pidStr := vars["pid"]
		fmt.Println(pidStr)
		cmd := exec.Command("kill", "-9", pidStr)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		err := cmd.Run()
		if err != nil {
			w.Write([]byte(fmt.Sprint("Error al matar el proceso:", err)))
			return
		}
		if err != nil {
			fmt.Println(err)
		}
		w.Write([]byte("Proceso eliminado con exito!"))
	}).Methods("GET")
	go func() {
		log.Println("Servidor escuchando en el puerto 8080...")
		log.Fatal(http.ListenAndServe(":8080", r))
	}()

	envios()
}

func posteos(info string, extension string) {
	url := "http://localhost:3000/set"
	url = fmt.Sprint(url, extension)

	// Datos que deseas enviar en la solicitud POST
	data := []byte(info)

	// Realiza la solicitud POST
	fmt.Println(bytes.NewBuffer(data))
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(data))
	if err != nil {
		fmt.Println("Error al realizar la solicitud POST:", err)
		return
	}
	defer resp.Body.Close()
}

func envios() {
	ticker := time.NewTicker(5 * time.Second)
	selector := 0
	for {
		select {
		case <-ticker.C:
			if selector == 0 {
				fmt.Println("Obteniendo Datos de RAM")
				cmd := exec.Command("sh", "-c", "cat /proc/ram_201701015")
				Combine, err := cmd.CombinedOutput()
				if err != nil {
					fmt.Println(err)
				}
				retorno := string(Combine[:])
				posteos(retorno, "ram")
				fmt.Println("Realizando un evio de ram...")
				selector++
			} else {
				fmt.Println("Obteniendo Datos de CPU")
				cmd := exec.Command("sh", "-c", "cat /proc/cpu_201701015")
				Combine, err := cmd.CombinedOutput()
				if err != nil {
					fmt.Println(err)
				}
				retorno := string(Combine[:])
				fmt.Println(retorno)
				posteos(retorno, "cpu")
				fmt.Println("Realizando una evio de cpu...")
				selector--
			}

		}
	}
}
