import React, { useState, useEffect } from 'react'
import WordList from '../WordList.json'
import axios from 'axios'

const Prompt = ({isLoggedIn, currUser, setCurrUser}) => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  const [adj, setAdj] = useState(WordList.adj[getRandomInt(12)])
  const [noun, setNoun] = useState(WordList.noun[getRandomInt(12)])
  const [verb, setVerb] = useState(WordList.verb[getRandomInt(12)])
  const [currPrompt, setCurrPrompt] = useState(adj.concat(' ', noun, ' ', verb))

  const newPrompt = () => {
    setAdj(WordList.adj[getRandomInt(12)])
    setNoun(WordList.noun[getRandomInt(12)])
    setVerb(WordList.verb[getRandomInt(12)])
  }

  useEffect(async () => {
    setCurrPrompt(adj.concat(' ', noun, ' ', verb))
  })

  const savePrompt = async () => {
    const { email } = currUser
    const { data } = await axios.post('/dashboard/saveprompt', { email, currPrompt})
    setCurrUser(data)
    console.log('data from saveprompt', data)
    // console.log('updatedCurrUser', currUser)
    // if (!data.answer) {
    //   window.alert('error answering question')
    // }
  }
  
  return (
    <div className='prompt'>
      <h1> Draw something inspired by: </h1>
      <h2> {adj} </h2>
      <h2> {noun} </h2>
      <h2> {verb} </h2>
      <button type="button" onClick={() => {
        newPrompt()
        // setCurrPrompt(adj.concat(' ', noun, ' ', verb))
        }}> 
      New Prompt </button>
      {isLoggedIn && (     
        <div> 
          <button type="button" onClick={() => savePrompt()}> Save </button>
          <button type="button" onClick={() => console.log('timer action goes here')}> Timer </button>
        </div>
      )}
    </div>
  )
}

export default Prompt