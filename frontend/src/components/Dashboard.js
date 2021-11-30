import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currUser, setCurrUser] = useState('')
  const [savedPrompts, setSavedPrompts] = useState([])

  const updateUser = async () => {
    try {
      const { data } = await axios.post('/account/isloggedin')
      if (data !== 'There was an error!') {
        setCurrUser(data)
        console.log('data', data)
        setSavedPrompts(data.savedPrompts)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } catch (err) {
      setIsLoggedIn(false)
    }
  }

  //every first render, get user info
  // useEffect(async () => {
  //   try {
  //     const { data } = await axios.post('/account/isloggedin')
  //     if (data !== 'There was an error!') {
  //       setCurrUser(data)
  //       setSavedPrompts(data.savedPrompts)
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }
  //   } catch (err) {
  //     setIsLoggedIn(false)
  //   }
  // },[])

  useEffect(() => {
    console.log('use effect')
    updateUser()
    const intervalID = setInterval(() => {
      console.log('use effect')
      updateUser()
    }, 5000)
    return () => clearInterval(intervalID)
  }, [])

  const unsavePrompt = async (currPromptIndex) => {
    const { email } = currUser
    const { data } = await axios.post('/dashboard/unsaveprompt', { email, currPromptIndex})
    console.log('updated list of savedprompts after deletion', data)
  }

  return (
    <div>
      <h1> Dashboard </h1>
      <h2> Your Saved Prompts </h2>
      <div className="prompts">
          <div className="column left">
            {savedPrompts.map((savedPrompt, num) => (
              <div key={num}>
                <p> {savedPrompt} </p>
                <button type="button" className="prompt-delete" onClick={() => {
                  // unsavePrompt(num)
                  console.log('promptindex to unsace', num)
                }}>
                  Delete
                </button>
                <br />
              </div>
            ))}
          </div>
          {/* <div className="column right">
            <Question setCurrQ={setCurrQ} question={currQ} isLoggedIn={isLoggedIn} />
          </div> */}
        </div>
    </div>
  )
}

export default Dashboard