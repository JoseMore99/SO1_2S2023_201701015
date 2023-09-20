import React from 'react';
import Principal from './Principal';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import History from './History';


function App() {
  return (
    <div className="App fixed-top m-2">
      <h1> SOPES 1</h1>
      
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/reg">Historial</Link>
            </li>
          </ul>
        </nav>
      <Routes>

        <Route path="/"  element={<Principal/>} />
        <Route path="/reg" element={<History/>} />
      </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;
