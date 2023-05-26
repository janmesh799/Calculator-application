import React from 'react'
import { Link } from "react-router-dom"
import './Login.css'

const Login = () => {
  const handleSubmit = (e) => {
    e.PreventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='login-form'>
        <span>Login</span>
        <input className='login-form-input' type='email' placeholder='email' />
        <input className='login-form-input' type='password' placeholder='password' />
        <button className='login-form-submit-btn'> Login</button>
        <p>Don't have an account <Link to='/signup'>create Account</Link> </p>
      </form>
    </div>
  )
}

export default Login