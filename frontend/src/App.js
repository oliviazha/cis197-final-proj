import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Prompt from './components/Prompt.js'
// import WordList from './WordList.json'
 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const words = require('categorized-words')

  // const checkLoggedin = async () => {
  //   try {
  //     const { data } = await axios.post('/account/isloggedin')
  //     if (data !== 'There was an error!') {
  //       setCurrUser(data)
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }
  //   } catch (err) {
  //     setIsLoggedIn(false)
  //   }
  // }

  // useEffect(async () => {
  //   try {
  //     const { data } = await axios.post('/account/isloggedin')
  //     console.log(isLoggedIn)
  //     if (data !== 'There was an error!') {
  //       setCurrUser(data)
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }
  //   } catch (err) {
  //     setIsLoggedIn(false)
  //   }
  // }, [])


  return (
    <div>
      {!isLoggedIn && (
        <ul className="navbar">
          <li><h1> UNBOXED </h1></li>
          <li style={{float: 'right'}}><Link to="/login">Sign in</Link></li>
          <li style={{float: 'right'}}><Link to="/signup">Sign up</Link></li>
          <li style={{float: 'right'}}> <Link to="/about">About</Link></li>
        </ul>
      )}
      {isLoggedIn && (
      <ul className="navbar">
        <li><h1> [logo here]! </h1></li>
        <li style={{float: 'right'}}><Link to="/dashboard">Dashboard</Link></li>
        <li style={{float: 'right'}}><p> Generator </p></li>
      </ul>          
      )}
      <Prompt />
    </div>
  )
}
export default App