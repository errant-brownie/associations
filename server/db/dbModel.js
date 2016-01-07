var Sequelize = require('sequelize');
var sequelize = new Sequelize('freeAssoc', 'root', 'password');

var User = sequelize.define('User', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING, unique: true },
  password: { type: Sequelize.STRING }
});

var ItemUser = sequelize.define('item_user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: Sequelize.INTEGER },
  item_id: { type: Sequelize.INTEGER }
});

var Item = sequelize.define('Item', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  item: { type: Sequelize.STRING, unique: true }
});

var CategoryItem = sequelize.define('category_item', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  item_id: { type: Sequelize.INTEGER },
  category_id: { type: Sequelize.INTEGER }
});

var Category = sequelize.define('Category', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  category: { type: Sequelize.STRING, unique: true },
});

var init = function() {
  Item.belongsToMany(User, { through: 'item_user', foreignKey: 'item_id' });
  User.belongsToMany(Item, { through: 'item_user', foreignKey: 'user_id' });
  Item.belongsToMany(Category, { through: 'category_item', foreignKey: 'item_id' });
  Category.belongsToMany(Item, { through: 'category_item', foreignKey: 'category_id' });
  sequelize.sync();
};

module.exports = {
  User: User,
  Category: Category,
  Item: Item,
  init: init
};

init();