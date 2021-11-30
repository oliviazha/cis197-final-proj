const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('cookie-session')
require('./passport')
const path = require('path')

const UserRouter = require('./routes/account')
const DashboardRouter = require('./routes/dashboard')
const isAuthenticated = require('./middlewares/isAuthenticated')

const app = express()

app.use(session({
  // name: 'google-auth-session',
  keys: ['key1', 'key2'],
  maxAge: 24*60*60*1000,
}))

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

const port = process.env.PORT || 3000

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://oliviazha:*Oz254517@cluster0.ay8fu.mongodb.net/finalProj?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist')) // set the static folder

//middleware that parses body in terms of json
app.use(express.json())

// app.use('/project', projectRouter)
// app.use('/search', searchRouter)
// app.use('/login', loginRouter)

app.get("/", (req, res) => {
  res.json({message: "You are not logged in"})
})

app.use('/account', UserRouter)
app.use('/dashboard', DashboardRouter)

// app.get('/google',
//   passport.authenticate('google', {
//           scope:
//               ['email', 'profile']
//       }
//   ));

// app.get('/google/callback',
//   passport.authenticate('google', {
//       failureRedirect: '/failed',
//   }),
//   function (req, res) {
//       res.redirect('/')
//   }
// );

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


// set favicon
// app.get('/favicon.ico', (req, res) => {
//   res.status(404).send()
// })

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.use((err, req, res, next) => {
  res.status(200).send('There was an error!')
})

// Start listening for requests
app.listen(port, () => {
  console.log('Listening on port ' + port)
})