const express = require('express')

const router = express.Router()

const User = require('../model/User')
const isAuthenticated = require('../middlewares/isAuthenticated')

// router.post('/isloggedin', isAuthenticated, (req, res) => {
//   try {
//     res.send(req.session.username)
//   } catch (err) {
//     res.status(200).send('not logged in')
//   }
// })

// signup (create user)
router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    await User.create({ email, password })
    res.send('user created')
  } catch (err) {
    res.status(200).send('user sign up has problems')
  }
})

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.send('user does not exist')
    } else {
      const { password: passDB } = user // const passDB = user.password
      if (password === passDB) {
        req.session.email = email
        req.session.password = password
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    res.send('user creation has problems')
  }
})

// logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.email = null
  req.session.password = null
  res.send('user is logged out')
})

module.exports = router
