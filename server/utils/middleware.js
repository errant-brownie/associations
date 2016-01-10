//MiddleWare
var bodyParser = require('body-parser');
var auth = require('./auth'); // ./auth does some stuff to set up passport
var morgan = require('morgan');

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('express-session')({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false 
  }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(auth.passport.initialize());
  app.use(auth.passport.session());

  app.use(express.static(__dirname + '/../../client'));
};
