import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const createUser = async () => {
    const { data } = await axios.post('/account/signup', { email, password })
    if (data === 'user created') {
      await axios.post('/account/login', { email, password })
      navigate('../')
    } else {
      window.alert('sign up error! try again')
    }
  }

  return (
    <div className="signup">
      <div className="signup-page">
        <h1>Sign Up</h1>
        Username
        <br />
        <input onChange={e => setEmail(e.target.value)} />
        <br />
        Password
        <br />
        <input onChange={e => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={() => createUser()}> Sign Up </button>
        <a className="google-btn" href="/account/google">Join with Google</a>
        <p>
          Already have an account?&nbsp;
          <Link to="/login">Log in here!</Link>
        </p>
      </div>
    </div>
  )
}
export default Signup
