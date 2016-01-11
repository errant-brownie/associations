var Engine = require('../controllers/engineController.js');
var Items = require('../controllers/itemsController.js');

// get related items associated with the logged in user
// inputs: 
// in data field:
//   nothing
// outputs:
// in data field:
//   items: list of objects, each object will have a property "item"
//     and "strength". "item" will link to an item object,
//     "strength" will link to the item's association strength
var getAssociations = function (request, response, next){
  Items.getItemsForUsers(request.user.id)
  .then(function(items){
    return Engine.getRelatedItems(items);
  })
  .then(function(relatedItems){
    response.json(relatedItems);
  });
};

// BROKEN!
// custom association query.
// inputs:
// in data field:
//   items: [array] of items to check for associations, 
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
var postAssociations = function(request,response,next){
  Engine.getRelatedItems(request.body.items)
  .then(function (relatedItems){
    response.json(relatedItems);
  });
};

module.exports = {
  getAssociations: getAssociations,
  postAssociations: postAssociations,
};
