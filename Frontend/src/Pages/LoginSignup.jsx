import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fileds">
            <input type="email" placeholder='SID@link.cuhk.edu.hk' />
        </div>
        <div className="loginsignup-fileds">
          <input type="password" placeholder='Password' />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Don't have an account? <span>Sign up here</span></p>
        <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continueing, I agree to the terms of use & privacy policy. </p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
