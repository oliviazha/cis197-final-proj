import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import App from './src/App'
import About from './src/components/About'
import Dashboard from './src/components/Dashboard'
import Login from './src/components/Login.js'
import Signup from './src/components/Signup.js'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} /> */}
    </Routes>
  </Router>,
  document.getElementById('react-root'),
)
