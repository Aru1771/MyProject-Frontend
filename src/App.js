import React, { useEffect, useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.log(err));
  }, []);

  const addEmployee = () => {
    fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(newEmp => setEmployees([...employees, newEmp]));
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Employee Manager</h2>
      <input
        placeholder="Enter employee name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addEmployee}>Add</button>
      <ul>
        {employees.map((emp, i) => <li key={i}>{emp.name}</li>)}
      </ul>
    </div>
  );
}

export default App;

