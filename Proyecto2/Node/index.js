const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const redis = require('redis');
require('dotenv').config();
const mysql = require('mysql2/promise')

app.use(cors());
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
    database: process.env.DB_RED_NAME,
});

const infomysql = {
        host: process.env.DB_MY_HOST,
        user: process.env.DB_MY_USER,
        password: process.env.DB_MY_PASSWORD,
        port: process.env.DB_MY_PORT,
        database: process.env.DB_MY_NAME

}

app.get('/getsql', async (req, res) => {
    const conexion = await mysql.createConnection(infomysql)
    query = "SELECT * FROM Estudiantes"
    const [results,] = await conexion.execute(query, [])

    conexion.end(function (err) {
        if (err) {
            console.log(err.message);
            return
        }
    });
    conexion.destroy()
    res.json(results);
  });

app.get('/getsql', async (req, res) => {
    const conexion = await mysql.createConnection(infomysql)
    query = "SELECT * FROM Estudiantes"
    const [results,] = await conexion.execute(query, [])

    conexion.end(function (err) {
        if (err) {
            console.log(err.message);
            return
        }
    });
    conexion.destroy()
    res.json(results);
  });
  app.get('/masAlumnos', async function (req, res) {
    const conexion = await mysql.createConnection(infomysql)
    var query = ``
    if (req.query.sem != '') {
      query = `SELECT curso AS name, COUNT(carnet) AS value
      FROM Estudiantes
      WHERE SEMESTRE = ?
      GROUP BY curso;`
    }
    const [resultados,] = await conexion.execute(query, [req.query.sem])
    conexion.end(function (err) {
    });
    conexion.destroy()
    console.log(req.query.sem);
    console.log(resultados);
    res.send(resultados);
  });
  app.get('/mejorpromedio', async function (req, res) {
    const conexion = await mysql.createConnection(infomysql)
    var query = ``
    if (req.query.sem != '') {
      query = `SELECT carnet AS name, AVG(nota) AS value
      FROM Estudiantes
      WHERE SEMESTRE = ?
      GROUP BY carnet
      ORDER BY value DESC
      LIMIT 5;`
    }
    const [resultados,] = await conexion.execute(query, [req.query.sem])
    conexion.end(function (err) {
    });
    conexion.destroy()
    console.log(req.query.sem);
    console.log(resultados);
    res.send(resultados);
  });

  app.get('/aprobados', async function (req, res) {
    const conexion = await mysql.createConnection(infomysql)
    var query = ``
    if (req.query.sem != '') {
      query = `SELECT COUNT(CASE WHEN nota  >= 60 THEN 1 ELSE NULL END) AS aprobados,
      COUNT(CASE WHEN nota < 60 THEN 1 ELSE NULL END) AS reprobados
    FROM Estudiantes
    WHERE curso = ? 
      AND semestre  = ?
    GROUP BY curso, semestre;`
    }
    const [resultados,] = await conexion.execute(query, [req.query.cur,req.query.sem])
    conexion.end(function (err) {
    });
    conexion.destroy()
    console.log(req.query.sem);
    console.log(resultados);
    res.send(resultados);
  });

io.on('connection', (socket) => {
    //console.log("Se conecto un cliente");
    socket.on("key", async data => {
        //console.log(data);
            try {
                // Search Data in Redis
                const reply = await client.get("contador");
                io.emit("key","Cantidad de registros: "+ reply )
                const reply2 = await client.lRange( process.env.DB_key, 0, -1)
                var data=[]
                var data2=[]
                reply2.forEach(r => {
                    var x =JSON.parse(r)
                    if(x.semestre =="1S")data.push(JSON.parse(r))
                    if(x.semestre =="2S")data2.push(JSON.parse(r))
                });
                io.emit("key2",data )
                io.emit("key3",data2 )
            } catch (error) {
                console.log(error);
            }
            //io.emit("key", data + " desde el server")
       
    })
});

app.get('/', (req, res) => {
  res.send('¡Purueba api!');
});

server.listen(4000, async () => {
    await client.connect()
    console.log("Server on port 4000");
})