import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Prompt from './components/Prompt.js'
import Dashboard from './components/Dashboard.js'
// import WordList from './WordList.json'
 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currUser, setCurrUser] = useState('')
  const [showDashboard, setShowDashboard] = useState(false)
  // const words = require('categorized-words')

  // const checkLoggedin = async () => {
  //   try {
  //     const { data } = await axios.post('/account/isloggedin')
  //     if (data !== 'There was an error!') {
  //       console.log('user info', data)
  //       setCurrUser(data)
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }
  //   } catch (err) {
  //     setIsLoggedIn(false)
  //   }
  // }

  // useEffect(() => {
  //   checkLoggedin()
  //   const intervalID = setInterval(() => {
  //     checkLoggedin()
  //     console.log(isLoggedIn)
  //   }, 10000)
  //   return () => clearInterval(intervalID)
  // }, [])

  useEffect(async () => {
    try {
      const { data } = await axios.post('/account/isloggedin')
      if (data !== 'There was an error!') {
        // console.log('user data', data)
        setCurrUser(data)
        console.log('curruser after saveprompt', currUser)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } catch (err) {
      setIsLoggedIn(false)
    }
  }, [])


  const logoutUser = async () => {
    try {
      const { data } = await axios.post('/account/logout')
      if (data === 'user is logged out') {
        setIsLoggedIn(false)
        setShowDashboard(false)
      }
    } catch (err) {
      window.alert('logout error! try again')
    }
  }

  return (
    <div>
      {!isLoggedIn && (
        <ul className="navbar">
          {/* <li><h1> UNBOXED </h1></li> */}
          <li style={{fontSize: 25}}><Link to="/"> UNBOXED </Link></li>
          <li style={{float: 'right'}}><Link to="/login">Sign in</Link></li>
          <li style={{float: 'right'}}><Link to="/signup">Sign up</Link></li>
          <li style={{float: 'right'}}> <Link to="/about">About</Link></li>
        </ul>
      )}
      {console.log(currUser)}
      {isLoggedIn && (
      <div>
        <ul className="navbar">
          <li style={{fontSize: 25}}><Link to="/"> UNBOXED </Link></li>
          <li style={{float: 'right'}}><button type="button" className="navbutton" onClick={() => logoutUser()}> Log out </button></li>
          <li style={{float: 'right'}}><button type="button" className="navbutton" onClick={() => setShowDashboard(true)}> Dashboard </button></li>
          <li style={{float: 'right'}}><button type="button" className="navbutton" onClick={() => setShowDashboard(false)}> Generator </button></li>
          <li style={{float: 'right'}}> <Link to="/about"> About </Link></li>
          {/* <li style={{float: 'right'}}><p> {currUser.email} </p></li> */}
        </ul>
        {showDashboard && <Dashboard currUser={currUser} setCurrUser={setCurrUser} />}
      </div>          
      )}
      {!showDashboard && <Prompt isLoggedIn={isLoggedIn} currUser={currUser} setCurrUser={setCurrUser}/>}
    </div>
  )
}
export default App