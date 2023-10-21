package main

import (
	"context"
	"fmt"
	"log"
	"net"
	pb "server/proto"

	"google.golang.org/grpc"
)

var ctx = context.Background()

type server struct {
	pb.UnimplementedStudentServiceServer
}

const (
	port = ":3001"
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
