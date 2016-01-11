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
  var items = Items.getItemsForUsers([request.user.id]);
  console.log('user: ' + request.user.id + ' gots these items: ');
  console.dir(items);
  response.json();
};

var add = function (request, response, next) {
  var items = request.body;

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

module.exports = {
  getAll: getAll,
  add: add,
}
