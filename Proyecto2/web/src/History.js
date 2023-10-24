import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

function History() {

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
});
  return (
    <div className="App">
      {salida}<br/>
      <p>{album.Album}</p><br/>
      <p>{album.Artist}</p><br/>
      <p>{album.Year}</p><br/>
    </div>
  );

}

export default History;
