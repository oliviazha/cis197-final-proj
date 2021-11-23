import React, { useState } from 'react'
import WordList from '../WordList.json'

const Prompt = () => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  const [adj, setAdj] = useState(WordList.adj[getRandomInt(12)])
  const [noun, setNoun] = useState(WordList.noun[getRandomInt(12)])
  const [verb, setVerb] = useState(WordList.verb[getRandomInt(12)])

  const newPrompt = () => {
    setAdj(WordList.adj[getRandomInt(12)])
    setNoun(WordList.noun[getRandomInt(12)])
    setVerb(WordList.verb[getRandomInt(12)])
  }
  
  return (
    <div className='prompt'>
      <h1> Draw something inspired by: </h1>
      <h2> {adj} </h2>
      <h2> {noun} </h2>
      <h2> {verb} </h2>
      <button type="button" onClick={() => newPrompt()}> 
      New Prompt </button>
      <button type="button" onClick={() => console.log('save prompt action goes here')}> Save </button>
      <button type="button" onClick={() => console.log('timer action goes here')}> Timer </button>
    </div>
  )
}

export default Prompt