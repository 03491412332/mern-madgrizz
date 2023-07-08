const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_SECRET_ID,
      callbackURL:
        "http://localhost:4000/medgrizz/api/v1/users/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
