import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';


function Principal() {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];


  return (
    <div className="Principal m-2">
      <h1> Principal</h1>
      <div className='row'>
      <div className='col bg-Dark'>
        </div>
        <div className='col bg-secondary'>
        <h2>RAM</h2>
          <div style={{ width: '100%', height: 300 }} >
          <ResponsiveContainer>
            <PieChart>
              <Pie  data={data} dataKey="value" fill="#FFD700" label />
              <Tooltip/>
              <Legend/>
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
              <Pie dataKey="value" data={data} fill="#ADFF2F" label />
              <Tooltip/>
              <Legend/>
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
            <label className="form-label mt-4">Selecciona la ip de la maquina a monitorear</label>
            <select className="form-select" id="MV">
              <option>1</option>
              <option>2</option>
            </select>
        </div>
        <div className='col'>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
        </div>
        <div className='col-4'>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-active">
              <th scope="row">Active</th>
              <td>Column content</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
            </tbody>
        </table>
        </div>
        <div className='col'>
        </div>
      
      </div>
    </div>
  );
}

export default Principal;
