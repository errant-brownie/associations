// This module combines a bunch of passport stuff into one super authentication
// utility.

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var ensureAuth= require("connect-ensure-login");
var bcrypt = require("bcrypt-node");
var Promise = require("bluebird");
var usersController = require("../controllers/usersController.js");

// this creates our local strategy
passport.use(new LocalStrategy(
  function (username, password, done) {
    usersController.getUser({username:username})
    // found the user
    .then(function (user) {
      return Promise.promisify(bcrypt.compare)(password, user.password)
      .then(function (match) {
        // We nest these promises because we need to access both match and user.
        if (match) {
          // valid password
          return done(null, user, {message: user.id});
        } else {
          // invalid password
          return done(null, false, {message: "Incorrect password."});
        }
      });
    })
    // something happened
    .catch(function (err){
      if (err.message == 'User does not exist!') {
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
passport.serializeUser(function (user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
  usersController.getUser({username: username})
  .then (function (user) {
    var data = {
      id: user.id,
      username: user.username,
    };
    // data is set to request.user
    cb(null, data);
  })
  .catch(function (error){
    return cb(error);
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
var createUser = function (req, res, next){
  var user = req.body.user;

  // hashing is not done by the model, though it probably should
  Promise.promisify(bcrypt.hash)(user.password,null,null)
  .then(function (data) {
    user.password = data;
    return usersController.addUser(user);
  })
  .then(function (user) {
    var data = {};
    data.token = user.id;
    // sign in the new user
    passport.authenticate('local', {});
  })
  .catch(function (error) {
    res.json(error);
  });
};

var signOut = function(req, res){
  // call passport's log out functionality
  req.logout();
  res.redirect('/');
};

module.exports = {
  passport: passport,
  authenticate: passport.authenticate('local', {}),
  // ensuredLoggedIn is created by the guy who made Passport
  // It's not ideal for checking REST API, but it works.
  ensureLoggedIn: ensureAuth.ensureLoggedIn,
  ensureNotLoggedIn: ensureAuth.ensureNotLoggedIn,
  createUser: createUser,
  signOut: signOut
};
