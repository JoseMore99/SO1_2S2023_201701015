import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
function Principal() {
  const [infostudents, Addinfostudents] = useState([])
  const [promedio, Addpromedio] = useState([])
  const [numero, Addnumero] = useState([])
  const [procesos, Addprocesos] = useState([])
  useEffect(() => {
    Addnumero([
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 200 },
    ])
    Addprocesos([{
      carnet: 233233,
      nombre: "Alumno 1",
      curso: "SO1",
      nota: 90,
      semestre: "2S",
      year: 2023
    }, {
      carnet: 233233,
      nombre: "Alumno 2",
      curso: "SO1",
      nota: 90,
      semestre: "2S",
      year: 2023
    }, {
      carnet: 233233,
      nombre: "Alumno 3",
      curso: "SO1",
      nota: 90,
      semestre: "2S",
      year: 2023
    }])
    Addpromedio([
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group D', value: 200 },
      { name: 'Group C', value: 100 },
      { name: 'Group E', value: 50 },
    ])
    Addinfostudents([
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 }
    ])

  }, []);


  return (
    <div className="Principal m-2">
      <h1> Principal</h1>
      <div className='row'>
        <div className='col'></div>
        <div className='col'><h2 className="text-success-emphasis"> Datos almacenados</h2></div>
        <div className='col'></div>

      </div>
      <div className='row'>
        <div className='col'>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">CARNET</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">CURSO </th>
                <th scope="col">NOTA </th>
                <th scope="col">SEMESTRE </th>
                <th scope="col">AÑO </th>
              </tr>
            </thead>
            <tbody>
              {procesos.map((p) => (
                <tr className="table-active">
                  <th scope="row">{p.carnet}</th><td>{p.nombre}</td><td>{p.curso}</td><td>{p.nota}</td><td>{p.semestre}</td><td>{p.year}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h2 className="text-info">Porcentaje de aprobaciond e cursos</h2>
          <div style={{ width: '100%', height: 300 }} >
            <ResponsiveContainer>
              <PieChart>
                <Pie data={infostudents} dataKey="value" fill="#FFD700" label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='col'>
          <h2 className="text-info">Alumnos con mejor promedio</h2>
          <div style={{ width: '100%', height: 300 }} >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={numero}
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
                <Bar dataKey="value" stackId="a" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='col'>
          <h2 className="text-info"> Cursos con mas alumnos</h2>
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

      </div>
      <div className='row'>
        <p>JOSE CARLOS MOREIRA PAZ 201701015</p>
      </div>
    </div>
  );
}

export default Principal;
