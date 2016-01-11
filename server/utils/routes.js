// Routes
var auth = require('./auth'); // ./auth does some stuff to set up passport
var itemsRequestHandler = require('../requestHandlers/itemsRequestHandler.js');
var associationsRequestHandler = require('../requestHandlers/associationsRequestHandler.js');


module.exports = function (app, express) {
  // put routes in here

  // inputs:
  // in data field:
  //    user: 
  //      username: the useraname
  //      password: the password
  // output:
  // in data field:
  //    message: if failure, reason for failure
  app.post('/api/users/signin', auth.authenticate, function(req, res) {
    res.json({ message: "Authenticated" });
  });
  app.post('/api/users/signup', auth.createUser, function(req, res) {
    res.json({ message: "Authenticated" });
  });
  app.get('/signOut', auth.signOut);

  // GET /api/items gets the items the user likes
  // inputs: 
  // in session store:
  //   userid: id of user with the list we want to see,
  //     will use currently logged in user if userid is not
  //     provided
  // outputs:
  // in data field:
  //   items: list of item objects that the user likes
  app.get('/api/items', itemsRequestHandler.getAll);

  // POST /api/items adds items the user likes
  // inputs: 
  // in data field:
  //   items: items to add to the currently logged in user's list
  //      will create item if item does not yet exist in the database
  // outputs:
  // in data field;
  //   item: the new items that were created
  app.post('/api/items', itemsRequestHandler.add);

  // GET /api/associations gets the top items a user might like
  // inputs: 
  // in data field:
  //   nothing
  // outputs:
  // in data field:
  //   items: list of objects, each object will have a property "item"
  //     and "strength". "item" will link to an item object,
  //     "strength" will link to the item's association strength
  app.get('/api/associations', associationsRequestHandler.getAssociations);

  // POST /api/associations custom association query
  // inputs:
  // in data field:
  //   items: (optional) [array] of items to check for associations, 
  //     if missing, association engine will be given logged in user's 
  //     interest list
  //   maxItems: [integer] maximum number of items to return
  //   minStrength: [float between 0 and 1] minimum association strength
  //   maxStrength: [float between 0 and 1] maximum association strength
  //   myList: [boolean] wether or not to include logged in user's list
  //     of interests. Ignored if no items were passed
  // outputs:
  // in data field:
  //   items: list of objects, each object will have a property "item"
  //     and "strength". "item" will link to an item object,
  //     "strength" will link to the item's association strength
  app.post('/api/associations', associationsRequestHandler.postAssociations);
};
