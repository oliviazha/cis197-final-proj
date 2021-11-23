const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"429857389463-blouipomdkcudq1tj9ggi5f5n6pkbdk2.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));