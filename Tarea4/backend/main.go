package main

import (
	"fmt"
	"net/http"
	"os/exec"

	"github.com/gorilla/mux"
)

func main() {
	fmt.Println("Iniciando api")
	router := mux.NewRouter()
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Print("datos de la ram: #")
		cmd := exec.Command("sh", "-c", "cat /proc/ram_201701015")
		out, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println(err)
		}
		output := string(out[:])
		fmt.Println(output)
		fmt.Println("")

		w.Write([]byte(output))
	})
	http.ListenAndServe(":8080", router)

}
