import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onRegister = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ username, password });

      const res = await axios.post('/api/users/register', body, config);

      console.log('User registered:', res.data);
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  const onLogin = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ username, password });

      const res = await axios.post('/api/users/login', body, config);

      console.log('User logged in:', res.data);
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div>
      <h1>React Frontend</h1>
      <input
        type='text'
        placeholder='Username'
        name='username'
        value={username}
        onChange={(e) => onChange(e)}
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={(e) => onChange(e)}
      />
      <button onClick={onRegister}>Register</button>
      <button onClick={onLogin}>Login</button>
    </div>
  );
}

export default App;