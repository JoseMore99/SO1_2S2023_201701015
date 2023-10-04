import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';
import axios from 'axios';


export var selecto = ""
function Principal() {
  const [inforam, Addinforam] = useState([])
  const [infocpu, Addinfocpu] = useState([])
  const [procesos, Addprocesos] = useState([])
  const [ip, Addip] = useState([])
  const [seleccion, Addseleccion] = useState("")
  const apiUrl = process.env.REACT_APP_API_URL;
  const  cambioSelect = (event) => {
    Addseleccion(event.target.value); 
    
  }
  function filtro() {
    var params={ip:seleccion}
    selecto=seleccion
    axios.get(apiUrl+'getram',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        var aux = response.data[0]
        var temp = [
          { name: 'RAM LIBRE', value: parseFloat(aux.ram_libre) },
          { name: 'RAM EN USO', value: parseFloat(aux.ram_usada) }]
        Addinforam(temp)
      })
      .catch(error => {
        var temp = [
          { name: 'RAM LIBRE', value: parseFloat(100) },
          { name: 'RAM EN USO', value: parseFloat(1) }]
        Addinforam(temp)
        console.error('Error en la solicitud GET RAM:', error);
      });

      

    axios.get(apiUrl+'getcpu',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        var aux = response.data[0]
        var temp = [
          { name: 'CPU LIBRE', value: parseFloat(aux.cpu_libre) },
          { name: 'CPU EN USO', value: parseFloat(aux.cpu_usada) }]
        Addinfocpu(temp)
      })
      .catch(error => {
        var temp = [
          { name: 'CPU LIBRE', value: parseFloat(100) },
          { name: 'CPU EN USO', value: parseFloat(1) }]
        Addinfocpu(temp)
        console.error('Error en la solicitud GET CPU:', error);
      });

    axios.get(apiUrl+'getallcpu',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        console.log(response.data);
        Addprocesos(response.data)
      })
      .catch(error => {
        Addprocesos([])
        console.error('Error en la solicitud GET:', error);
      });
  }

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.get(apiUrl+'getallip') // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        console.log(response.data);
        Addip(response.data)
        Addseleccion(response.data[0].direccion_ip)
      })
      .catch(error => {
        // Maneja los errores
        console.error('Error en la solicitud GET:', error);
      });
    var params={ip:''}

    axios.get(apiUrl+'getram',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        console.log(response.data);
        var aux = response.data[0]
        var temp = [
          { name: 'RAM LIBRE', value: parseFloat(aux.ram_libre) },
          { name: 'RAM EN USO', value: parseFloat(aux.ram_usada) }]
        Addinforam(temp)
      })
      .catch(error => {
        // Maneja los errores
        console.error('Error en la solicitud GET:', error);
      });

      

    axios.get(apiUrl+'getcpu',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        console.log(response.data);
        var aux = response.data[0]
        var temp = [
          { name: 'CPU LIBRE', value: parseFloat(aux.cpu_libre) },
          { name: 'CPU EN USO', value: parseFloat(aux.cpu_usada) }]
        Addinfocpu(temp)
      })
      .catch(error => {
        console.error('Error en la solicitud GET:', error);
      });

    axios.get(apiUrl+'getallcpu',{params: params}) // Reemplaza con la URL de la API
      .then(response => {
        // Haz algo con los datos recibidos
        console.log(response.data);
        Addprocesos(response.data)
      })
      .catch(error => {
        console.error('Error en la solicitud GET:', error);
      });
  }, []);


  return (
    <div className="Principal m-2">
      <h1> Principal</h1>
      <div className='row'>
        <h2>ip: {seleccion}</h2>
        </div>
      <div className='row'>
        <div className='col bg-Dark'>
        </div>
        <div className='col bg-secondary'>
          <h2>RAM</h2>
          <div style={{ width: '100%', height: 300 }} >
            <ResponsiveContainer>
              <PieChart>
                <Pie data={inforam} dataKey="value" fill="#FFD700" label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='col bg-Dark'>
        </div>
        <div className='col bg-secondary'>
          <h2>CPU</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={infocpu} fill="#ADFF2F" label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='col bg-Dark'>
        </div>

      </div>
      <div className='row'>
        <div className='col'>
        </div>
        <div className='form-group col-4'>
          <label className="form-label mt-4"   >Selecciona la ip de la maquina a monitorear</label>
          <select className="form-select" id="MV" value={seleccion} onChange={cambioSelect}>
            {ip.map((p) => (
              <option value={p.direccion_ip}>{p.direccion_ip}</option>
            ))}

          </select>
          <button type="button" className="btn btn-info" onClick={filtro}>Seleccionar</button>
        </div>
        <div className='col'>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
        </div>
        <div className='col-4'>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">PID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">USUARIO </th>
                <th scope="col">ESTADO </th>
                <th scope="col">IP </th>
              </tr>
            </thead>
            <tbody>
              {procesos.map((p) => (
                <tr className="table-active">
                  <th scope="row">{p.pid}</th><td>{p.nombre_proceso}</td><td>{p.usuario}</td><td>{p.estado_proceso}</td><td>{p.dir_ip}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <div className='col'>
        </div>

      </div>
      <div className='row'>
        <p>JOSE CARLOS MOREIRA PAZ 201701015</p>
      </div>
    </div>
  );
}

export default Principal;
