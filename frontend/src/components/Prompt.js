import React, { useState, useEffect } from 'react'
import WordList from '../WordList.json'
import axios from 'axios'
import Timer from './Timer.js'
import unboxed from '../img/unboxed.gif'

const Prompt = ({isLoggedIn, currUser, setCurrUser}) => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  const [adj, setAdj] = useState(WordList.adj[getRandomInt(30)])
  const [noun, setNoun] = useState(WordList.noun[getRandomInt(40)])
  const [verb, setVerb] = useState(WordList.verb[getRandomInt(30)])
  const [currPrompt, setCurrPrompt] = useState(adj.concat(' ', noun, ' ', verb))
  const [isSaved, setIsSaved] = useState(false)
  const [showTimer, setShowTimer] = useState(false)

  const newPrompt = () => {
    setAdj(WordList.adj[getRandomInt(30)])
    setNoun(WordList.noun[getRandomInt(40)])
    setVerb(WordList.verb[getRandomInt(30)])
    setIsSaved(false)
  }

  useEffect(async () => {
    setCurrPrompt(adj.concat(' ', noun, ' ', verb))
  })

  const savePrompt = async () => {
    const { email } = currUser
    const { data } = await axios.post('/dashboard/saveprompt', { email, currPrompt})
    setCurrUser(data)
    setIsSaved(true)
  }
  
  return (
    <div className='prompt'>
      <div className='prompt-text'>
        <h1> Draw something inspired by: </h1>
        <h2> {adj} </h2>
        <h2> {noun} </h2>
        <h2> {verb} </h2>
      </div>
      {isLoggedIn && (     
        <div> 
          {!isSaved && <button type="button" onClick={() => savePrompt()}> Save </button>}
          <button type="button" onClick={() => setShowTimer(true)}> Timer </button>
        </div>
      )}
      <button type="button" onClick={() => {
        newPrompt()
        }}> 
      New Prompt </button>
      <img className= 'boxidea' style={{objectFit: 'contain', width: '100%'}} src={unboxed} height="600" />
      {showTimer && <Timer currUser={currUser} setCurrUser={setCurrUser} currPrompt={currPrompt} setShowTimer={setShowTimer}/>}
    </div>
  )
}

export default Prompt