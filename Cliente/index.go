package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func arbolAst(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("arbolAst.html"))
	t.Execute(w, "")
}

func main() {
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))

	http.HandleFunc("/", index)
	http.HandleFunc("/prueba", arbolAst)

	fmt.Printf("Servidor hola escuchando en: http://localhost:8000/")
	http.ListenAndServe(":8000", nil)
}
