var Sequelize = require('sequelize');
var sequelize = new Sequelize('freeAssoc', 'root', 'password', {dialect: 'mysql'});

var User = sequelize.define('User', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING, unique: true, notNull: true },
  password: { type: Sequelize.STRING, notNull: true, unique: false }
});

var ItemUser = sequelize.define('item_user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: Sequelize.INTEGER, notNull: true },
  item_id: { type: Sequelize.INTEGER, notNull: true },
});

var Item = sequelize.define('Item', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true , notNull: true}
});

var CategoryItem = sequelize.define('category_item', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  item_id: { type: Sequelize.INTEGER, notNull: true },
  category_id: { type: Sequelize.INTEGER, notNull: true }
});

var Category = sequelize.define('Category', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true, notNull: true },
});

var init = function() {
  Item.belongsToMany(User, { through: 'item_user', foreignKey: 'item_id' });
  User.belongsToMany(Item, { through: 'item_user', foreignKey: 'user_id' });
  Item.belongsToMany(Category, { through: 'category_item', foreignKey: 'item_id' });
  Category.belongsToMany(Item, { through: 'category_item', foreignKey: 'category_id' });
  sequelize.sync();
};

init();

module.exports = {
  User: User,
  Category: Category,
  Item: Item,
  ItemUser: ItemUser,
  CategoryItem: CategoryItem,
  init: init
};

// MISC DB TESTS

// init();

// userTest1 = {username: 'test1', password:'test1'};
// itemTest1 = {name: 'item1'};

// userTest2 = {username: 'test2', password: 'test2'};

// setTimeout(function() {
//   User.create(userTest1)
//     .then(function() {
//       User.find({where: {username: userTest1.username}})
//         .then(function (user) {
//           Item.create(itemTest1)
//             .then(function(item) {
//               ItemUser.create({ user_id: user.id, item_id: item.id, itemUser: item.name + user.username })
//                 .then(function (itemUser) {
//                 })
//             })
//         })
//         .catch(function (err) {
//           throw (new Error('No user found?!'));
//         })
//     })
// }, 2500)

// setTimeout(function() {
//   Item.findOrCreate({where: {name: 'item2'}})
//     .then(function(item) {
//       console.log(arguments)
//     })
// }, 5000)
