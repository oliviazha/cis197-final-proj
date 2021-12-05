import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginUser = async () => {
    try {
      const { data } = await axios.post('/account/login', { email, password })
      if (data === 'user logged in successfully') {
        navigate('../')
        console.log('logged in')
      } else {
        window.alert('login error! try again')
      }
    } catch (err) {
      window.alert('login error! try again')
    }
  }

  return (
    <div className="login">
      <div className="login-page">
        <h1>Sign In</h1>
        Username
        <br />
        <input onChange={e => setEmail(e.target.value)} />
        <br />
        Password
        <br />
        <input onChange={e => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={() => loginUser()}> Sign In </button> 
        {/* <Link to="/account/google"> Sign in with Google</Link> */}
        <a className="google-btn" href="/account/google">Sign in with Google</a>
        {/* <button type="button" onClick={() =>  }> Sign in with Google </button> */}
        <p>
          Don&apos;t have an account?&nbsp;
          <Link to="/signup">Sign up!</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
