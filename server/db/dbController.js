var model = require('./dbModel.js');

var getUser = function (user) {
  return model.User.findOne({ where: { username: user.username }})
    .then(function (match) {
      if (!match) {
        throw (new Error('User does not exist!'));
      } else {
        return match;
      }
    })
};

var addUser = function (user) {
  return model.User.findOne({ where: { username: user.username } })
    .then(function (match) {
      if (match) {
        throw (new Error('Username already exists'));
      } else {
        return user;
      }
    })
    .then(function (newUser) {
      return model.User.create({ username: newUser.username, password: newUser.password });
    });
};

var addItem = function (object) {
  // object will have the following format { item: { name: 'xyz' }, user: { id: 'INTEGER', name: 'abc' } }
  model.Item.findOrCreate({ where: { name: object.itemName } })
    .then(function (item) {
      return model.ItemUser.findOrCreate({ where: { item_id: item.id, used_id: object.user } });
    })
};

var getRelatedItems = function (itemList) {

};

var addCategory = function (req, res) {

};

var getCategory = function (req, res) {

};

var getAllCategories = function (req, res) {

};

module.exports = {
  getUser: getUser,
  addUser: addUser,
  addItem: addItem,
  getRelatedItems: getRelatedItems,
  addCategory: addCategory,
  getCategory: getCategory,
  getAllCategories: getAllCategories
};
