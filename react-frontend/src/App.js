import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // State for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for registration
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email: loginEmail,
        password: loginPassword
      });
      // Handle response, such as storing the JWT or navigating to another page
      console.log(response.data);
    } catch (error) {
      // Handle errors, such as showing a notification to the user
      console.error("Login error:", error.response);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword
      });
      // Handle response, such as indicating a successful registration or clearing form
      console.log(response.data);
    } catch (error) {
      // Handle errors, such as showing a notification to the user
      console.error("Registration error:", error.response);
    }
  };

  return (
    <div>
      {/* Login Form */}
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Registration Form */}
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="register-username">Username:</label>
          <input
            type="text"
            id="register-username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="register-email">Email:</label>
          <input
            type="email"
            id="register-email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            id="register-password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default App;