var express = require('express');

var app = express();


// configure our server with all the middleware and routing
require('./utils/middleware.js')(app, express);
require('./utils/routes.js')(app, express);

// start listening to requests on port 8000
app.listen(process.env.PORT || 8000);

// export our app for testing and flexibility, required by index.js
module.exports = app;

console.log('Listening to port: 8000');
