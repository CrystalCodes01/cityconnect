const passport= require('passport');
const bcrypt = require('bcrypt');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const CityModel = require('../models/city-user-model.js');
const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;

passport.serializeUser((userFromDb, next) => {
  next(null, userFromDb._id); // null in 1st argument means no error
});

passport.deserializeUser((idFromBowl, next) => {  // user is already logged in
  CityModel.findById (
    idFromBowl,

    (err, userFromDb) => {
      if (err) {
        next(err);
        return;
      }
      // Tell passport that we got the users info from the DB
      next(null, userFromDb);
    }
  );
});

passport.use(new LocalStrategy (   // tells passport that there is a strategy that exists
  {                        // 1st argument -> settings object
    usernameField: 'loginUsername',
    passwordField: 'loginPassword'
  },
  ( formUsername, formPassword, next ) => {        // 2nd argument -> callback (called when a user tries to log in)
      // the logic and operations within the callback are what happen when the user tries to log in.


    // #1 Is there an account with the provided username?
    //  (is there a user with that username in the database?)
    CityModel.findOne (
      { username: formUsername }, //formUsername - query the username

      (err, userFromDb) => { // random errors
        if (err){
          next(err);
          return;
        }

        // If the username doesnt exist, the "userFromDb" variable will be empty

        if (userFromDb === null) { // Check if "userFromDb" is empty
          // In Passport, if you call next with "false" in the 2nd position, that means LOGIN FAILED
          next(null, false);
          return;
        }
        // #2 If there is a user with that username, is the PASSWORD correct?
        if (bcrypt.compareSync(formPassword , userFromDb.encryptedPassword) === false) {
          // In Passport, if you call next() with "false" in 2nd position, that means LOGIN FAILED
          next(null, false);
          return;
        }

        // if we pass those "if" statements, LOGIN SUCCESS!
        next(null, userFromDb);
        // In Passport, if you call next() with a user in 2nd position, that means LOGIN SUCCESS
        // add to database
      }
    );

  }
));

// passport facebook (login with your facebook account)

passport.use(new FbStrategy(
  {                         // 1st argument -> callback
    clientID: process.env.myFacebookClientId,
    clientSecret: process.env.myFacebookClientSecret,

    callbackURL: '/auth/facebook/callback'
  },

  (accessToken, refreshToken, profile, next) => {  // 2nd argument -> callback
                    // (will be called when a user allows us to log them in with facebook)
        console.log('');
        console.log('------------  👽 FACEBOOK PROFILE INFO 👽 --------------');
        console.log(profile);
        console.log('');

        CityModel.findOne(
          { facebookId: profile.id },

          (err, userFromDb) => {
            if (err) {
              next(err);
              return;
            }
             // if this is the first time the user logs in from facebook 'userFromDb' will be empty

             // check if they have logged in before
             if (userFromDb) {
               next(null, userFromDb);
               return;
             }

             // if its the first log in save them in the DB
             const theUser = new CityModel({
               fullName: profile.displayName,
               facebookId: profile.id
             });

             theUser.save((err) => {
               if (err) {
                 next(err);
                 return;
               }
               // Now they are saved - log them in
               next(null, theUser);
             });
          }
        );
      // receiving the facebook user info and saving it
  }
));

passport.use(new GoogleStrategy(
  {                         // 1st argument -> callback
    clientID: process.env.myGoogleClientId,
    clientSecret: process.env.myGoogleClientSecret,

    callbackURL: '/auth/google/callback'
  },

  (accessToken, refreshToken, profile, next) => {  // 2nd argument -> callback
                    // (will be called when a user allows us to log them in with facebook)
        console.log('');
        console.log('------------  🌪 GOOGLE PROFILE INFO 🌪  --------------');
        console.log(profile);
        console.log('');

        CityModel.findOne(
          { googleId: profile.id },

          (err, userFromDb) => {
            if (err) {
              next(err);
              return;
            }
             // if this is the first time the user logs in from facebook 'userFromDb' will be empty

             // check if they have logged in before
             if (userFromDb) {
               next(null, userFromDb);
               return;
             }

             // if its the first log in save them in the DB
             const theUser = new CityModel({
               fullName: profile.displayName,
               googleId: profile.id
             });

            // if the displayName is empty use email instead
             if (theUser.fullName === undefined) {
               theUser.fullName = profile.emails[0].value;
             }

             theUser.save((err) => {
               if (err) {
                 next(err);
                 return;
               }
               // Now they are saved - log them in
               next(null, theUser);
             });
          }
        );
      // receiving the facebook user info and saving it
    // UNLESS we have already saved their info, in which case we log them in
  }
));
