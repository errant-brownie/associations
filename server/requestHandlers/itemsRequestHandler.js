// File contains the express request handlers for the 
// items endpoint

var Items = require('../controllers/itemsController');
var Promise = require('bluebird');

// GET /api/items gets the items the user likes
// inputs: 
// in data field:
//   userid: id of user with the list we want to see,
//     will use currently logged in user if userid is not
//     provided
// outputs:
// in data field:
//   items: list of item objects that the user likes
var getAll = function (request, response, next){
  Items.getItemsForUsers([request.user.id])
    .then(function(items) {
      response.json(items);
    });
};

// add item to the currently logged in user
var add = function (request, response, next) {
  var items = request.body;

  // We need to iterate over the items list, because Items.addItem 
  // only takes one item at a time.
  // Also, we're filtering for the items that were created so
  // that we can return it in the response
  Promise.filter(items, function(item) {
    var params = {
      item: {
        name: item.name
      },
      user: {
        id : request.user.id,
        name: request.user.username,
      },
    }
    return Items.addItem(params)
    .spread(function (item, created) {
      return created;
    });
  })
  .then(function(createdItems){
    response.json(createdItems);
  });
};

var remove = function (request, response, next) {
  Items.removeItemFromUser(request.user.id, request.data.name)
  .then(function(){
    next();
  });
}

module.exports = {
  getAll: getAll,
  add: add,
  remove: remove
}
