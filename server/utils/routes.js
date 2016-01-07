// Routes
var auth = require('./auth'); // ./auth does some stuff to set up passport

module.exports = function (app, express) {
  // put routes in here

  app.post('/api/users/signin', auth.authenticate);
  app.post('/api/users/signup', auth.createUser)

  // GET /api/items gets the items the user likes
  // inputs: 
  // in data field:
  //   userid: id of user with the list we want to see,
  //     will use currently logged in user if userid is not
  //     provided
  // outputs:
  // in data field:
  //   items: list of item objects that the user likes
  app.get('/api/items', auth.ensureLoggedIn, itemController.getAll);

  // POST /api/items adds items the user likes
  // inputs: 
  // in data field:
  //   items: items to add to the currently logged in user's list
  //      will create item if item does not yet exist in the database
  // outputs:
  // in data field;
  //   item: the new items that were created
  app.post('/api/items', auth.ensureLoggedIn, itemsController.add);

  // GET /api/associations gets the top items a user might like
  // inputs in datafielt
  app.get ('/api/associations', auth.ensureLoggedIn, associationController.getAssociations)

  // POST /api/associations custom association query
};
