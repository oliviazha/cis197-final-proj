const isAuthenticated = (req, res, next) => {
  if (req.user || req.session.email) {
    next()
  } else {
    console.log('email', req.session.email)
    console.log('user', req.session.user)
    next(new Error('user not authenticated'))
  }
}

module.exports = isAuthenticated