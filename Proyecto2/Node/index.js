const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const redis = require('redis');
require('dotenv').config();
const mysql = require('mysql2/promise')

app.use(cors);
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());



const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const client = redis.createClient({
    host: process.env.DB_RED_HOST, // Dirección del servidor Redis
    port: process.env.DB_RED_PORT,        // Puerto del servidor Redis
    database: DB_RED_NAM,
});

const infomysql = {
    db: {
        host: process.env.DB_MY_HOST,
        user: process.env.DB_MY_USER,
        password: process.env.DB_MY_PASS,
        port: process.env.DB_MY_PORT
    }
}

app.get('/getsql', async (req, res) => {
    const conexion = await mysql.createConnection(config.db)
    query = "SELECT * FROM Estudiantes"
    const [results,] = await conexion.execute(sql, [])

    conexion.end(function (err) {
        if (err) {
            console.log(err.message);
            return
        }
    });
    conexion.destroy()
    res.json(results);
  });


io.on('connection', (socket) => {
    console.log("Se conecto un cliente");
    socket.on("key", async data => {
        console.log(data);
            try {
                // Search Data in Redis
                const reply = await client.get("contador_album");
                io.emit("key","Cantidad de albums: "+ reply )
                const reply2 = await client.get("album"+reply);
                const albumData = JSON.parse(reply2);
                io.emit("key2",albumData )
            } catch (error) {
                console.log(error);
            }
            //io.emit("key", data + " desde el server")
       
    })
});

app.get('/', (req, res) => {
  res.send('¡Purueba api!');
});

server.listen(3000, async () => {
    await client.connect()
    console.log("Server on port 3000");
})