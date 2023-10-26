package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"
	"os"
	pb "server/proto"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
)

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

var ctx = context.Background()
var conexion = ConectSql()

type server struct {
	pb.UnimplementedStudentServiceServer
}

const (
	port = ":8001"
)

type Data struct {
	carnet   int32
	nombre   string
	curso    string
	nota     int32
	semestre string
	year     int32
}

func (s *server) SaveStudentInfo(ctx context.Context, in *pb.StudentInfo) (*pb.ReplyInfo, error) {
	fmt.Println("Recibí de cliente: ", in.GetNombre())
	data := Data{
		carnet:   in.GetYear(),
		nombre:   in.GetNombre(),
		curso:    in.GetCurso(),
		nota:     in.GetNota(),
		semestre: in.GetSemestre(),
		year:     in.GetYear(),
	}
	fmt.Println(data)
	query := `INSERT INTO Estudiantes (carnet,nombre,curso,nota,semestre,anio) VALUES (?,?,?,?,?,?);`
	result, err := conexion.Exec(query, data.carnet, data.nombre, data.curso, data.nota, data.semestre, data.year)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(result)
	return &pb.ReplyInfo{Info: "Hola cliente, recibí el comentario"}, nil
}

func main() {
	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	pb.RegisterStudentServiceServer(s, &server{})

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}
}
