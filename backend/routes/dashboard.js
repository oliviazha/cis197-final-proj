const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()
const User = require('../model/User')

// get user?
// router.get("/", isAuthenticated, (req, res) => {
//   res.send(req.user.email)
// })

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
 
module.exports = router
