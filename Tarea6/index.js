const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const redis = require('redis');

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
    host: 'localhost', // Dirección del servidor Redis
    port: 6379,        // Puerto del servidor Redis
    database: 0,
});


io.on('connection', (socket) => {
    console.log("Se conecto un cliente");
    socket.on("key", data => {
        console.log(data);
        setInterval(async () => {
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
        }, 500);
    })
});



server.listen(3000, async () => {
    await client.connect()
    console.log("Server on port 3000");
})