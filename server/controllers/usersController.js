var model = require('../db/dbModel.js');

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

module.exports = {
  getUser: getUser,
  addUser: addUser
};