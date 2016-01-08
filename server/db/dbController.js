var model = require('./dbModel.js');

var getUser = function (user) {
  model.User.findOne({ where: { username: user.username }})
    .then(function (match) {
      if (!match) {
        throw (new Error('User does not exist!'));
      } else {
        return match;
      }
    })
    .catch(function (err) {
      console.log(err);
      throw err;
    })
};

// var getAllUsers = function (req, res) {
//   model.User.findAll()
//     .then(function (users) {
//       if (users.length === 0) {
//         throw (new Error('No users exist in the database!'));
//       } else {
//         return users;
//       }
//     })
// }

var addUser = function (user) {
  model.User.findOrCreate({ username: user.username, password: user.password })
    .spread(function (user, created) {
      if (!created) {
        throw (new Error('Username already exists!'));
      } else {
        return user;
      }
    })
    .catch(function (err) {
      console.log(err);
      throw err;
    })
};

var addItem = function (object) {
  model.Item.findOrCreate({ name: object.itemName })
    .spread(function (item, created) {
      return model.ItemUser.create({
        user_id: object.userID, 
        item_id: item.id, 
        itemUser: object.userID.toString() + item.id
      })
    })
};

var getRelatedItems = function (itemList) {
  // SELECT Item.name FROM Item WHERE Item.id
  model.User.findAll({include: req.})

};

var addCategory = function (req, res) {

};

var getCategory = function (req, res) {

};

var getAllCategories = function (req, res) {

};

module.exports = {

}
