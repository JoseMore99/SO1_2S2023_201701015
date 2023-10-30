import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
function History() {
  const [promedio, Addpromedio] = useState([])
  const [promedio2, Addpromedio2] = useState([])
  const socket = io("http://localhost:4000");
  const [salida, AddSalida] = useState("")
  const [data, AddData] = useState([{
    carnet: 233247,
    nombre: 'Alumno 2',
    curso: 'BD1',
    nota: 90,
    semestre: '2S',
    year: 2023
  },
  {
    carnet: 233248,
    nombre: 'Alumno 3',
    curso: 'BD1',
    nota: 90,
    semestre: '2S',
    year: 2023
  }])
  const [data2, AddData2] = useState([{
    carnet: 233247,
    nombre: 'Alumno 2',
    curso: 'BD1',
    nota: 90,
    semestre: '2S',
    year: 2023
  },
  {
    carnet: 233248,
    nombre: 'Alumno 3',
    curso: 'BD1',
    nota: 90,
    semestre: '2S',
    year: 2023
  }])

  function cursos() {
    var SO1 = 0
    var BD1 = 0
    var LFP = 0
    var SA = 0
    var AYD1 = 0

    data.forEach(d => {
        if (d.curso === "SO1") SO1++;
        else if (d.curso === "BD1") BD1++;
        else if (d.curso === "LFP") LFP++;
        else if (d.curso === "SA") SA++;
        else if (d.curso === "AYD1") AYD1++;


    });
    Addpromedio([
      { name: 'SO1', value: SO1 },
      { name: 'BD1', value: BD1 },
      { name: 'LFP', value: LFP },
      { name: 'SA', value: SA },
      { name: 'AYD1', value: AYD1 },
    ])
  }

  function cursos2() {
    var SO1 = 0
    var BD1 = 0
    var LFP = 0
    var SA = 0
    var AYD1 = 0

    data2.forEach(d => {
        if (d.curso === "SO1") SO1++;
        else if (d.curso === "BD1") BD1++;
        else if (d.curso === "LFP") LFP++;
        else if (d.curso === "SA") SA++;
        else if (d.curso === "AYD1") AYD1++;

    });
    Addpromedio2([
      { name: 'SO1', value: SO1 },
      { name: 'BD1', value: BD1 },
      { name: 'LFP', value: LFP },
      { name: 'SA', value: SA },
      { name: 'AYD1', value: AYD1 },
    ])
  }

  useEffect(() => {
    socket.emit("key", "201701015");
    socket.on("key", (t) => {
      console.log(t);
      AddSalida(t)
    })
    socket.on("key2", (t) => {
      console.log(t);
      AddData(t)
    })
    socket.on("key3", (t) => {
      console.log(t);
      AddData2(t)
    })
    cursos()
    cursos2()
  });
  return (
    <div className="App">
      {salida}<br />
      <h1>PRIMER SEMESTRE</h1>
      <div style={{ width: '100%', height: 300 }} >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={promedio}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" stackId="a" fill="#ADFF2F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h1>SEGUNDO SEMESTRE</h1>
      <div style={{ width: '100%', height: 300 }} >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={promedio2}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" stackId="a" fill="#ADFF2F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

}

export default History;
