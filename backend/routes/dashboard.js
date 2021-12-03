const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()
const User = require('../model/User')

// get user info
router.post("/", isAuthenticated, async (req, res) => {
  const { email } = req.body
    try {
      const findUser = await User.findOne({ email })
      res.send(findUser)
      // const savedPrompts = findUser.savedPrompts 
      // res.send(savedPrompts)
    } catch (err) {
      res.send(email)
      // res.send('problems with getting saved prompts')
    }
})

// save prompt
router.post('/saveprompt', isAuthenticated, async (req, res) => {
  const { email, currPrompt} = req.body

  try {
    const findUser = await User.findOne({ email })
    const savedPrompts = findUser.savedPrompts 
    const updatedUser = await User.findOneAndUpdate({ email }, { savedPrompts: [...savedPrompts, currPrompt] }, { new: true })
    res.send(updatedUser)
    // res.json(q)
  } catch (err) {
    res.send('problems with saving a new prompt')
  }
})

// unsave prompt
router.post('/unsaveprompt', isAuthenticated, async (req, res) => {
  const { email, savedPromptIndex } = req.body

  try {
    const findUser = await User.findOne({ email })
    const savedPrompts = findUser.savedPrompts 
    savedPrompts.splice(savedPromptIndex, 1)
    const updatedUser = await User.findOneAndUpdate({ email }, { savedPrompts: savedPrompts}, { new: true })
    res.send(updatedUser)
    // res.json(q)
  } catch (err) {
    res.send('problems with unsaving a prompt')
  }
})

// add completed prompt
router.post('/addcompleted', isAuthenticated, async (req, res) => {
  const { email, currPrompt} = req.body

  try {
    const findUser = await User.findOne({ email })
    const completedPrompts = findUser.completedPrompts
    const updatedUser = await User.findOneAndUpdate({ email }, { completedPrompts: [...completedPrompts, currPrompt] }, { new: true })
    res.send(updatedUser)
    // res.json(q)
  } catch (err) {
    res.send('problems with adding completed prompt')
  }
})


// remove completed prompt
router.post('/removecompleted', isAuthenticated, async (req, res) => {
  const { email, completedPromptIndex } = req.body

  try {
    const findUser = await User.findOne({ email })
    const completedPrompts = findUser.completedPrompts 
    completedPrompts.splice(completedPromptIndex, 1)
    const updatedUser = await User.findOneAndUpdate({ email }, { completedPrompts: completedPrompts}, { new: true })
    res.send(updatedUser)
    // res.json(q)
  } catch (err) {
    res.send('problems with removing a completed prompt')
  }
})
 
module.exports = router
