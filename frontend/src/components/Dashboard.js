import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Timer from './Timer.js'

const Dashboard = ({currUser, setCurrUser}) => {
  const [savedPrompts, setSavedPrompts] = useState([])
  const [completedPrompts, setCompletedPrompts] = useState([])
  const [displaySaved, setDisplaySaved] = useState(true)
  const [showTimer, setShowTimer] = useState(false)
  const [currPrompt, setCurrPrompt] = useState('')

  useEffect(() => {
    const updateUser = async () => {
      const { email } = currUser
      const { data } = await axios.post('/dashboard', { email })
      setSavedPrompts(data.savedPrompts)
      setCompletedPrompts(data.completedPrompts)
    }
    updateUser()
    const intervalID = setInterval(() => {
      updateUser()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  // every first render, get user info
  // useEffect(async () => {
  //   setSavedPrompts(currUser.savedPrompts)
  // }, [])

  // useEffect(async () => {
  //   setSavedPrompts(currUser.savedPrompts)
  // }, [currUser])

  const unsavePrompt = async (savedPromptIndex) => {
    const { email } = currUser
    const { data } = await axios.post('/dashboard/unsaveprompt', { email, savedPromptIndex})
    setCurrUser(data)
    console.log('updated list of savedprompts after deletion', data)
  }

  const removeCompletedPrompt = async (completedPromptIndex) => {
    const { email } = currUser
    const { data } = await axios.post('/dashboard/removecompleted', { email, completedPromptIndex})
    setCurrUser(data)
    console.log('updated list of completedprompts after deletion', data)
  }

  return (
    <div className= "dashboard">
      <h1> Hello {currUser.email}! </h1>
      {/* <h2> Your Saved Prompts </h2> */}
      <div className="prompts">
          <div className="column left">
            <div className="dashboard-toggle">
              <button type="button" className="display-saved" onClick={() => setDisplaySaved(true)}> Saved Prompts </button>
              <button type="button" className="display-completed" onClick={() => setDisplaySaved(false)}> Completed Prompts </button>
            </div>
          </div>
          <div className="column right">
          {displaySaved && savedPrompts.map((savedPrompt, num) => (
              <div className="savedPrompt" key={num}>
                <h3>{savedPrompt} </h3>
                <button type="button" onClick={() => {
                  setShowTimer(true)
                  setCurrPrompt(savedPrompt)
                }}> Timer </button>
                <button type="button" className="prompt-delete" onClick={() => {
                  unsavePrompt(num)
                }}>
                  Delete
                </button>
                {showTimer && <Timer currUser={currUser} setCurrUser={setCurrUser} currPrompt={currPrompt} setShowTimer={setShowTimer}/>}
              </div>
            ))}
            {!displaySaved && completedPrompts.map((completedPrompt, num) => (
              <div className= "savedPrompt" key={num}>
                <h3>{completedPrompt} </h3>
                <button type="button" className="prompt-delete" onClick={() => {
                  removeCompletedPrompt(num)
                }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Dashboard