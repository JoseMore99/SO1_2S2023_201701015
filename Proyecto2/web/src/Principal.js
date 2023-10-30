import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from 'axios';

function Principal() {
  const [infostudents, Addinfostudents] = useState([])
  const [promedio, Addpromedio] = useState([])
  const [numero, Addnumero] = useState([])
  const [semestre, Addsemestre] = useState("")
  const [procesos, Addprocesos] = useState([])
  const [curso, Addcurso] = useState("")
  
  function masAlumnos() {
    const apiUrl = process.env.REACT_APP_API_URL;
    var params={sem:semestre,cur:curso}
    axios.get(apiUrl+'masAlumnos',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        Addnumero(response.data)
      })
      .catch(error => {
        // Maneja los errores
        console.error('Error en la solicitud GET:', error);
      });
  }

  function mejorPromedio() {
    const apiUrl = process.env.REACT_APP_API_URL;
    var params={sem:semestre,cur:curso}
    axios.get(apiUrl+'mejorpromedio',{params: params})
      .then(response => {
        Addpromedio(response.data)
      })
      .catch(error => {
        // Maneja los errores
        console.error('Error en la solicitud GET:', error);
      });
  }

  function aprobados() {
    const apiUrl = process.env.REACT_APP_API_URL;
    var params={sem:semestre,cur:curso}
    axios.get(apiUrl+'aprobados',{params: params})
      .then(response => {
        console.log(response.data[0]["aprobados"])
        console.log(response.data[0]["reprobados"])
        Addinfostudents([{ name: 'Aprobados', value: response.data[0]["aprobados"] },
        { name: 'Reprobados', value:  response.data[0]["reprobados"] }])
      })
      .catch(error => {
        // Maneja los errores
        console.error('Error en la solicitud GET:', error);
      });
  }
  
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    Addnumero([
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 200 },
    ])

    axios.get(apiUrl+'getsql')
    .then(response => {
      var aux = response.data
      Addprocesos(aux)
    })
    .catch(error => {
      console.error('Error en la solicitud GET SQL:', error);
    });


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
                  <th scope="row">{p.carnet}</th><td>{p.nombre}</td><td>{p.curso}</td><td>{p.nota}</td><td>{p.semestre}</td><td>{p.anio}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h2 className="text-info">Porcentaje de aprobacion de cursos</h2>
          <div class="form-group row">
            <div class="col-sm-10">
              <input class="form-control form-control-lg" type="text"  placeholder="Curso"value={curso} onChange={(e)=>Addcurso(e.target.value)}/>
            </div>
            <div class="col-sm-10">
              <input class="form-control form-control-lg" type="text" placeholder="Semestre" value={semestre} onChange={(e)=>Addsemestre(e.target.value)}/>
            </div>
            <div class="col-sm-10">
            <button type="button" class="btn btn-primary btn-lg" onClick={aprobados}>Revisar</button>
            </div>
          </div>
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
          <h2 className="text-info">Alumnos con mejor promedio {}</h2>
          <div class="form-group row">
            <div class="col-sm-10">
              <input class="form-control form-control-lg" type="text" placeholder="Semestre" value={semestre} onChange={(e)=>Addsemestre(e.target.value)}/>
            </div>
            <div class="col-sm-10">
            <button type="button" class="btn btn-primary btn-lg" onClick={mejorPromedio}>Revisar</button>
            </div>
          </div>
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
                <Bar dataKey="value" stackId="a" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='col'>
          <h2 className="text-info"> Cursos con mas alumnos</h2>
          <div class="form-group row">
            <div class="col-sm-10">
              <input class="form-control form-control-lg" type="text" placeholder="Semestre" value={semestre} onChange={(e)=>Addsemestre(e.target.value)}/>
            </div>
            <div class="col-sm-10">
            <button type="button" class="btn btn-primary btn-lg" onClick={masAlumnos}>Revisar</button>
            </div>
          </div>
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
