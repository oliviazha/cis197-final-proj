import React, { useState } from 'react';
// const outTheBox = require('img/text-graphic.png')
import outTheBox from '../img/outthebox.png'

const About = () => {
  return (
    <div className="about">       
    <h1> About </h1>
      <div className="column left">
        <p style={{fontSize: 18}}> Thanks for visiting Unboxed! <br/> <br/> We hope that here you're able to join in on an unboxing of ideas, creativity, and passion for drawing! 
          Unboxed prompts are generated from a curated wordbank to spark inspiration for your next artistic masterpiece. 
          Feel free to start timed drawing sessions or save prompts to come back to later. And of course, remember to think outside of the box :) </p>
      </div>
        <div className="column right">
          <img src={outTheBox} height="600" />
        </div>
    </div>
  )
}

export default About