import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function History() {
  const data = [
    { name: 'Group A', uv: 400 },
    { name: 'Group B', uv: 300 },
    { name: 'Group C', uv: 300 },
    { name: 'Group D', uv: 200 },
  ];
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
            data={data}
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
            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
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
            data={data}
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
            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default History;
