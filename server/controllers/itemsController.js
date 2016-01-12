var model = require('../db/dbModel.js');

var addItem = function (object) {
  // object will have the following format { item: { name: 'xyz' }, user: { id: 'INTEGER', name: 'abc' } }
  var params = { name: object.item.name }
  return model.Item.findOrCreate({
    where: params, 
    defaults: params 
  })
  .spread(function (item) {
    var params = { item_id: item.id, user_id: object.user.id }
    return model.ItemUser.findOrCreate({ where: params, defaults: params });
  })
};

var getItems = function (userId) {
  return model.User.findOne({ 
    where: {
      id: userId
    },
    include: [ model.Item ]
  })
  .then(function (user) {
    return user.Items;
  });
};

var getItemsForUsers = function (userIds) {
  return model.ItemUser.findAll({
    where: {
      user_id: userIds
    }
  })
  .then(function (results) {
    return model.Item.findAll({
      where: {
        id: results.map(function (result) {
          return result.item_id
        })
      }
    })
  })
}

var removeItemForUser = function (userID, itemName) {
  return model.Item.findOne({
    where: {
      name : itemName,
    }
  })
  .then(function (item) {
    return model.ItemUser.destroy({
      where: {
        item_id: item.id,
        user_id: userID,
      }
    })
  });
}

module.exports = {
  getItems: getItems,
  getItemsForUsers: getItemsForUsers,
  addItem: addItem
};

// addItem({ item: { name: "asdf" }, user: { id: 1 } })
//     .then(function() {
//       return getItems(1)
//     })
//     .then(function (items) {
//       console.log(items.map(function (item) {
//         return item.toJSON()
//       }))
//     })
