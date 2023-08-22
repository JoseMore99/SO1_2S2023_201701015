import { useState } from 'react';

function App() {
  const [Title,setTitle]=useState("")
  const [Gerne,setGerne]=useState("")
  const [Artista,setArtista]=useState("")
  const [Year,setYear]=useState(0)
  const [Canciones,setCanciones]=useState([{
    "title":"Sempiternal",
    "artist":"BMTH",
    "year":2013,
    "genre":"Metalcore"
}])
  const getTitle =({target})=>{
    setTitle(target.value)
  }
  const getGerne =({target})=>{
    setGerne(target.value)
  }
  const getArtista =({target})=>{
    setArtista(target.value)
  }
  const getYear =({target})=>{
    setYear(target.value)
  }

  const posteando =()=>{
    var url = 'http://localhost:8080/postCanciones';
    var data = {
      title:Title,
      artist:Artista,
      year:Year,
      genre:Gerne
  }
  console.log(data)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      alert(response);

      //setSalida(response)
    } );
  }

  const geteando =()=>{
    var url = 'http://localhost:8080/getcanciones';
    fetch(url, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response);
      setCanciones(response)
    } );
  }

  return (
    <div className="App">
      <div className = "col">
      <h1>App</h1>
        </div>
        <div className = "row">

      <div className = "col">
        <div className = "row m-1">
            <label for="staticEmail" className="col col-form-label">Titulo</label>
              <input type="text" className="col col-form-label" value={Title} onChange={getTitle}  />
        </div>
        <div className = "row m-1">
            <label for="staticEmail" className="col col-form-label">Artista</label>
              <input type="text" className="col col-form-label" value={Artista} onChange={getArtista}  />
        </div>
        <div className = "row m-1">
            <label for="staticEmail" className="col col-form-label">Año</label>
              <input type="text" className="col col-form-label" value={Year} onChange={getYear}  />
        </div>
        <div className = "row m-1">
            <label for="staticEmail" className="col col-form-label">Genero</label>
              <input type="text" className="col col-form-label" value={Gerne} onChange={getGerne}  />
        </div>
        <div className = "row m-1">
          <br/>
        <button type="button" className="btn btn-dark" onClick={posteando}>Registrar</button>
        </div>
      </div>
      <div className = "col ">
      <button type="button" className="btn btn-dark" onClick={geteando}>Actualizar lista</button>
      
      
      <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Artista</th>
              <th scope="col">Titulo</th>
              <th scope="col">Año</th>
              <th scope="col">Genero</th>
            </tr>
          </thead>
          <tbody>
          {Canciones.map(item => (
            <tr className="table-active" key={item.id}>
            <th scope="row">{item.artist}</th>
            <td>{item.title}</td>
            <td>{item.year}</td>
            <td>{item.genre}</td>
          </tr>
          ))}
            </tbody>
        </table>
        </div>
      </div>
     
    </div>
  );
}

export default App;
