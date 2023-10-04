const express = require('express');
const mydb = require('mysql2/promise')
const cors = require('cors')
require('dotenv').config();

const app = express();
const port = 4000;
app.use(express.json())
app.use(cors())

const dbconf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

// Ruta de ejemplo
app.get('/', async function (req, res) {
  const conexion = await mydb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
  var query = `CREATE DATABASE IF NOT EXISTS biblioteca;`
  await conexion.execute(query)
  query = `CREATE TABLE biblioteca.InfoPc (
    direccion_ip VARCHAR(45)  PRIMARY KEY
);`
  await conexion.execute(query)
  query = `CREATE TABLE biblioteca.InfoRAM (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ram_usada DECIMAL(10,2),
    ram_libre DECIMAL(10,2),
    dir_ip VARCHAR(45),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dir_ip) REFERENCES biblioteca.InfoPc(direccion_ip)
);`
  await conexion.execute(query)
  query = `CREATE TABLE biblioteca.InfoCPU (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpu_usada DECIMAL(10,2),
    cpu_libre DECIMAL(10,2),
    dir_ip VARCHAR(45),
    pid INT NOT NULL,
    nombre_proceso VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    estado_proceso VARCHAR(50),
    porcentaje_ram DECIMAL(5, 2),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dir_ip) REFERENCES biblioteca.InfoPc(direccion_ip)
);`
  await conexion.execute(query)
  conexion.end(function (err) {
    console.log("Fin Conexion");
  });
  conexion.destroy()

  res.send('¡¡¡Api funcionando!!!');
});

app.get('/borrar', async function (req, res) {
  const conexion = await mydb.createConnection(dbconf)
  var query = `DROP TABLE biblioteca.InfoPc;`
  await conexion.execute(query)
  query = `DROP TABLE biblioteca.InfoCPU`
  await conexion.execute(query)
  query = `DROP TABLE biblioteca.InfoRAM`
  await conexion.execute(query)
  conexion.end(function (err) {
    console.log("Fin Conexion");
  });
  conexion.destroy()

  res.send('¡¡¡Api funcionando!!!');
});

app.post('/ip', async function (req, res) {
  const ipcliente = req.header('x-forwarded-for') ||
    req.socket.remoteAddress;
  try {
    const conexion = await mydb.createConnection(dbconf)
    const query = `INSERT INTO biblioteca.InfoPc (direccion_ip) VALUES (?)`
    const valores = [ipcliente]
    await conexion.execute(query, valores)
    conexion.end(function (err) {
      console.log("Fin Conexion");
    });
    conexion.destroy()
  } catch (error) {
    console.log(error)
  }

  console.log(`La dirección IP del cliente es: ${ipcliente}`);
  res.send(`La dirección IP del cliente es: ${ipcliente}`);

});


app.post('/setram', async function (req, res) {
  // Obtiene los datos del cuerpo de la solicitud POST
  try {
    var datos = JSON.parse(req.body);
  } catch (error) {
    var datos = req.body;
  }
  const ipcliente = req.header('x-forwarded-for') ||
    req.socket.remoteAddress;
  //console.log('Datos POST  de RAM recibidos:', datos);
  const conexion = await mydb.createConnection(dbconf)
  const query = `INSERT INTO biblioteca.InfoRAM (ram_usada,ram_libre,dir_ip) VALUES (?, ?, ?)`
  const valores = [datos.UsedRAM, datos.FreeRam, ipcliente]
  await conexion.execute(query, valores)
  conexion.end(function (err) {
    console.log("Fin Conexion");
  });
  conexion.destroy()

  // Enviar una respuesta
  res.status(200).json({ message: 'Solicitud POST recibida y procesada.' });
});

app.post('/setcpu', async function (req, res) {
  // Obtiene los datos del cuerpo de la solicitud POST
  const datos = req.body;
  const procesos = datos.Procesos
  const cpu = datos.cpu
  const cpu_libre = 100 - cpu
  const ipcliente = req.header('x-forwarded-for') ||
    req.socket.remoteAddress;
  // Aquí puedes procesar los datos POST como desees
  //console.log('Datos POST de CPU recibidos:', datos);
  const conexion = await mydb.createConnection(dbconf)
  for (let index = 0; index < procesos.length; index++) {
    const element = procesos[index];
    const query = `INSERT INTO biblioteca.InfoCPU (cpu_usada, cpu_libre, dir_ip, pid,nombre_proceso,usuario,estado_proceso ,porcentaje_ram ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    const valores = [cpu, cpu_libre, ipcliente, element.PID, element.Nombre, element.Usuario, element.Estado, 0]
    await conexion.execute(query, valores)
  }
  conexion.end(function (err) {
    console.log("Fin Conexion");
  });
  conexion.destroy()
  // Enviar una respuesta
  res.status(200).json({ message: 'Solicitud POST recibida y procesada.' });
});

app.get('/getram', async function (req, res) {
  const conexion = await mydb.createConnection(dbconf)
  var query = `SELECT *
  FROM biblioteca.InfoRAM
  ORDER BY id DESC
  LIMIT 1;`
  if (req.query.ip != '') {
    query = `SELECT *
    FROM biblioteca.InfoRAM
    WHERE dir_ip = ?
    ORDER BY id DESC
    LIMIT 1;`
  }
  const [resultados,] = await conexion.execute(query, [req.query.ip])

  conexion.end(function (err) {
    console.log("Conexion cerrada exitosamente");
  });
  conexion.destroy()
  resultados;
  res.send(resultados);
});
app.get('/getcpu', async function (req, res) {
  const conexion = await mydb.createConnection(dbconf)
  var query = `SELECT *
  FROM biblioteca.InfoCPU
  ORDER BY id DESC
  LIMIT 1;`
  if (req.query.ip != '') {
    query = `SELECT *
    FROM biblioteca.InfoCPU
    WHERE dir_ip = ?
    ORDER BY id DESC
    LIMIT 1;`
  }
  const [resultados,] = await conexion.execute(query, [req.query.ip])

  conexion.end(function (err) {
    console.log("Conexion cerrada exitosamente");
  });
  conexion.destroy()
  resultados;
  res.send(resultados);
});

app.get('/getallram', async function (req, res) {
  const conexion = await mydb.createConnection(dbconf)
  var query = `SELECT *
  FROM biblioteca.InfoRAM;`
  if (req.query.ip != '') {
    query = `SELECT *
    FROM biblioteca.InfoRAM
    WHERE dir_ip = ?`
  }
  const [resultados,] = await conexion.execute(query, [req.query.ip])

  conexion.end(function (err) {
    console.log("Conexion cerrada exitosamente");
  });
  conexion.destroy()
  resultados;
  res.send(resultados);
});
app.get('/getallcpu', async function (req, res) {
  const conexion = await mydb.createConnection(dbconf)
  var query = `SELECT *
  FROM biblioteca.InfoCPU;`
  if (req.query.ip != '') {
    query = `SELECT *
    FROM biblioteca.InfoCPU
    WHERE dir_ip = ?`
  }
  const [resultados,] = await conexion.execute(query, [req.query.ip])

  conexion.end(function (err) {
    console.log("Conexion cerrada exitosamente");
  });
  conexion.destroy()
  resultados;
  res.send(resultados);
});

app.get('/getallip', async function (req, res) {
  const conexion = await mydb.createConnection(dbconf)
  const query = `SELECT *
  FROM biblioteca.InfoPc`
  const [resultados,] = await conexion.execute(query, [])

  conexion.end(function (err) {
    console.log("Conexion cerrada exitosamente");
  });
  conexion.destroy()
  resultados;
  res.send(resultados);
});



// Inicia el servidor
app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});