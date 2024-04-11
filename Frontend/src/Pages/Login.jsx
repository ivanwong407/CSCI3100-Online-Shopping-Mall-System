import './CSS/Login.css'
import { Link } from 'react-router-dom'
import React, { useState } from 'react';


const Login = () => {

  const [menu,setMenu] = React.useState("login");

  return (
    <div className='login'>
      <div className="login-container">
        <h1>User Login</h1>
        <div className="login-fileds">
            <input type="email" placeholder='SID@link.cuhk.edu.hk' />   
        </div>
        <div className="signup-fileds">
            <input type="password" placeholder='Password' />
        </div>
        <button>Login</button>
        <p className="login-login">Do not have an account? <span onClick={()=>{setMenu("signup")}}><Link style={{ textDecoration: 'none', color: 'palevioletred'}} to='/signup'>SignUp here</Link>{menu==="signup"?<hr/>:<></>}</span></p>

      </div>
    </div>
  )
}

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();

      // Construct the request payload
      const payload = {
          username: username,
          password: password
      };

      try {
          // Send the POST request to the backend API
          const response = await fetch('/api/users/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload)
          });

          // Parse the JSON response
          const data = await response.json();

          if (response.ok) {
              // Handle success - you could redirect to login page or log the user in
              setMessage(data.message);
          } else {
              // Handle errors - show message to the user
              setMessage(data.message);
          }
      } catch (error) {
          // Handle network errors
          setMessage('Network error: ' + error.message);
      }
  };
  return (
    <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </label>
        <br />
        <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </label>
        <br />
        <button type="submit">Sign Up</button>
        {message && <p>{message}</p>}
    </form>
);
}


export default Login

