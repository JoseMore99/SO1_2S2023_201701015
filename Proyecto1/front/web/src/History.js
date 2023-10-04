import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import {selecto} from './Principal';

function History() {
  const [inforam, Addinforam] = useState([])
  const [infocpu, Addinfocpu] = useState([])
  
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    var params={ip:selecto}
    axios.get(apiUrl+'getallram',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        var tempo1 = response.data
        var temp = []
        tempo1.forEach((element)=>{
          var tempo2 = {name: String(element.fecha_registro), ram: parseFloat(element.ram_usada) }
          temp.push(tempo2)
        })
        Addinforam(temp)
      })
      .catch(error => {
        // Maneja los errores
        console.error('Error en la solicitud GET:', error);
      });

    axios.get(apiUrl+'getallcpu',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        var tempo1 = response.data
        var temp = []
        tempo1.forEach((element)=>{
          var tempo2 = {name: String(element.fecha_registro), cpu: parseFloat(element.cpu_usada) }
          temp.push(tempo2)
        })
        Addinfocpu(temp)
      })
      .catch(error => {
        console.error('Error en la solicitud GET:', error);
      });
  }, []);

  return (
    <div className="History m-2">
      <h1> Historial</h1>
      <div className='row'>
        <div className='col'>
          <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
           width={500}
            height={200}
            data={inforam}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend/>
            <Line type="monotone" dataKey="ram" stroke="#8884d8" fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>
        <div className='col'>
          <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
           width={500}
            height={200}
            data={infocpu}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend/>
            <Line type="monotone" dataKey="cpu" stroke="#8884d8" fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default History;
