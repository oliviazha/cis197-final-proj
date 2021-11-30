const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('./model/User')

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"429857389463-blouipomdkcudq1tj9ggi5f5n6pkbdk2.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:3000/account/google/callback",
        // passReqToCallback   : true
    },
    function(accessToken, refreshToken, profile, done) {
      //check user table for anyone with a facebook ID of profile.id
      User.findOne({
          'googleId': profile.id 
      }, (err, user) => {
          if (err) {
              return done(err);
          }
          //No user was found... so create a new user with values from Google 
          if (!user) {
            // User.create({email: profile.displayName, googleId: profile.id })
              user = new User({
                  email: profile.displayName,
                  googleId: profile.id 
              });
              user.save((err) => {
                  if (err) console.log(err);
                  return done(err, user);
              })
          } else {
              //found user. Return
              return done(err, user);
          }
      })
    // function(accessToken, refreshToken, profile, cb) {
    //   User.findOrCreate({ email: profile.displayName, googleId: profile.id }, function (err, user) {
    //     console.log('new user', user.googleId)
    //     return cb(err, user)
    //   })
    // async (accessToken, refreshToken, profile, done) => {
    //   // console.log(profile)
    //   try {
    //     const user = await User.findOrCreate({ email: profile.displayName, googleId: profile.id })
    //     return done(null, profile)
    //   } catch (err) {
    //     return done(error, null)
    //   }
    }
));