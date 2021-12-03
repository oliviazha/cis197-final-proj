import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Timer = ({currUser, setCurrUser, currPrompt, setShowTimer}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  }

  const reset = () =>  {
    setMinutes(0);
    setSeconds(5);
    setIsActive(false);
  }

  const addCompletedPrompt = async () => {
    const { email } = currUser
    const { data } = await axios.post('/dashboard/addcompleted', { email, currPrompt})
    console.log(currPrompt)
    setCurrUser(data)
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false)
            clearInterval(myInterval)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } 
      }, 1000);
    } else if (!isActive || (minutes === 0 && seconds === 0)) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);


  return (
    <div className="timer">    
      <div className="timer-content">  
        <h1> Timed Drawing Session </h1>
          <div className="popup">
            <h2> {currPrompt} </h2>
            <h3> 15 minutes </h3>
            {/* <button type="button" onClick={() => setStartTimer(true)}> Start Timer </button> */}
          </div>
          {/* <div className="start-timer">
            { minutes === 0 && seconds === 0 ? null
                : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
            }
            </div> */}
          <div className="app">
            <div className="time">
              <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
            </div>
            <div className="row">
              <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                {isActive ? 'Pause' : 'Start'}
              </button>
              {isActive && <button className="button" onClick={reset}>
                Reset
              </button>}
              <button type="button" style={{float: 'right'}} onClick={() => {
                reset()
                setShowTimer(false) 
              }}> Cancel </button>
              <button type="button" style={{float: 'right'}} onClick={() => {
                addCompletedPrompt()
                setShowTimer(false) 
              }} > Mark Completed </button>
            </div>
          </div>
      </div> 
    </div>
  )
}

export default Timer