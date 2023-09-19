const express = require('express');
const app = express();
const port = 4000;
app.use(express.json())

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡¡¡Api funcionando!!!');
});

app.get('/ip',function(req, res) {
  const ipcliente = req.header('x-forwarded-for')  ||
						req.socket.remoteAddress;
  console.log(`La dirección IP del cliente es: ${ipcliente}`);
  res.send(`La dirección IP del cliente es: ${ipcliente}`);

});


app.post('/setram', (req, res) => {
  // Obtiene los datos del cuerpo de la solicitud POST
  const datos = req.body;

  // Aquí puedes procesar los datos POST como desees
  console.log('Datos POST  de RAM recibidos:', datos);

  // Enviar una respuesta
  res.status(200).json({ message: 'Solicitud POST recibida y procesada.' });
});
app.post('/setcpu', (req, res) => {
  // Obtiene los datos del cuerpo de la solicitud POST
  const datos = req.body;

  // Aquí puedes procesar los datos POST como desees
  console.log('Datos POST de CPU recibidos:', datos);

  // Enviar una respuesta
  res.status(200).json({ message: 'Solicitud POST recibida y procesada.' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});