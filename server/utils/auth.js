// This module combines a bunch of passport stuff into one super authentication
// utility.


var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var ensureAuth= require("connect-ensure-login");
var bcrypt = require("brcypt-node");
var Promise = require("bluebird");
var dbController = require("../db/dbController.js");

passport.use(new LocalStrategy(
  function(username, password, done) {
    dbController.getUser({username:username})
    // found the user
    .then(function (user){
      return Promise.promisify(bcrypt.compare)(password, user.password)
      .then(function(match){
        if(match){
          // valid password
          return done(null, user);
        } else {
          // invalid password
          return done(null, false, {message:"Incorrect password."});
        }
      });
    })
    // something happened
    .catch(function(err){
      if(err.message === "User does not exist"){
        return(done(null, false, {message: "User not found."}));
      } else {
        return done(err);
      }
    });
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// inputs:
  // in data field:
  //    user: 
  //      username: the useraname
  //      password: the password
  // output:
  // in data field:
  //    message: if failure, reason for failure
var createUser = function(req, res, next){
  var user = req.body.user;
  Promise.promisify(bcrypt.hash)(user.password)
  .then(function(data){
    user.password = data;
  });
  dbController.addUser(user);
  next();
},

module.exports = {
  passport: passport,
  authenticate: passport.authenticate('local', {failureFlash: true}}),
  ensureLoggedIn: ensureAuth.ensureLoggedIn,
  ensureNotLoggedIn: ensureAuth.ensureNotLoggedIn,
  createUser: createUser,
}
