package main

import (
	pb "client/proto"
	"context"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var ctx = context.Background()

type Data struct {
	carnet   int32
	nombre   string
	curso    string
	nota     int32
	semestre string
	year     int32
}

func insertData(c *fiber.Ctx) error {
	fmt.Println("insertando info")
	data := make(map[string]interface{})

	e := c.BodyParser(&data)
	if e != nil {
		fmt.Println(e)
		return e
	}
	rank := Data{
		carnet:   int32(data["carnet"].(float64)),
		nombre:   data["nombre"].(string),
		curso:    data["curso"].(string),
		nota:     int32(data["nota"].(float64)),
		semestre: data["semestre"].(string),
		year:     int32(data["year"].(float64)),
	}

	go SendServ(rank)

	return nil
}

func SendServ(rank Data) {
	conn, err := grpc.Dial("localhost:8001", grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock())
	if err != nil {
		log.Fatalln(err)
	}

	cl := pb.NewStudentServiceClient(conn)
	defer func(conn *grpc.ClientConn) {
		err := conn.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(conn)

	ret, err := cl.SaveStudentInfo(ctx, &pb.StudentInfo{
		Carnet:   rank.carnet,
		Nombre:   rank.nombre,
		Curso:    rank.curso,
		Nota:     rank.nota,
		Semestre: rank.semestre,
		Year:     rank.year,
	})
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("Respuesta del server " + ret.GetInfo())
}

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"res": "todo bien",
		})
	})
	app.Post("/insert", insertData)

	err := app.Listen(":8000")
	if err != nil {
		return
	}
}
