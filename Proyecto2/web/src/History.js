import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend } from 'recharts';
function History() {
  const [promedio, Addpromedio] = useState([])
const socket = io("http://localhost:3000");
const [salida,setsalida] = useState("")
const [album,setalbum] = useState({
  Album: "Death magnetic",
  Artist: "Metallica",
  Year: "2008"
  }
  )
useEffect(() => {
  socket.emit("key", "201701015");
  socket.on("key", (t) => {
      console.log(t);
      setsalida(t)
  })
  socket.on("key2", (t) => {
    console.log(t);
    setalbum(t)
})

Addpromedio([
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group C', value: 100 },
  { name: 'Group E', value: 50 },
])
});
  return (
    <div className="App">
      {salida}<br/>
      <p>{album.Album}</p><br/>
      <p>{album.Artist}</p><br/>
      <p>{album.Year}</p><br/>

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
    </div>
  );

}

export default History;
