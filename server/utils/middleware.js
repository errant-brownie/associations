//MiddleWare
var bodyParser = require('body-parser');
var passport = require('./auth');

module.exports = function (app, express) {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('express-session')({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false 
  }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(__dirname + '/../../client'));
};
