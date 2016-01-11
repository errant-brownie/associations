var model = require('../db/dbModel.js');

// The heart of the project...
// The order of operations is as follows:
// 1) Find all users associated with item
// 2) Find all items associated with users
// 3) Add all items to the data object and increment counts associated with items
// 4) Calculate resulting strength of association (count / maxCount)
// 5) Return array of objects consisting of {id: item.id, name: item.name, strength: (calculated strength) }

var getRelatedItems = function (itemList) {
  var data = {};
  var itemObj = {};

  // max count for calculating relational strength
  var maxCount = 0;

  // translate itemList into object for fast referencing
  for (var j = 0; j < itemList.length; j++) {
    itemObj[itemList[j].name] = null;
  };

  // for each item in the itemList array [ { id: 123, name: 'abc' }, { id: 124, name: 'xyz' } ]
  Promise.reduce(itemList, function(item) {
    // find all occurances of that item in the join table, expected to return array of { user_id: xx, item_id: yy } to the .then block
    return model.itemUser.findAll({ where: { item_id: itemList[i].id }})
      .then(function (member) {
        var itemCounts = {};

        // for each item_id in the array of { user_id: xx, item_id: yy }'s
        for (var i = 0; i < member.length; i++) {
          // find each item that this member 'likes'
          model.Item.findOne({ where: { id: member[i].item_id }})
            .then(function (item) {
              if (!itemObj[item.name]) {
                if (itemCounts[item.name]) {
                  itemCounts[item.name].count++;
                } else {
                  itemCounts[item.name].id = item.id;
                  itemCounts[item.name].count = 1;
                  itemCounts[item.name].strength = 0;
                }
              }
            })
        }
        return itemCounts;
      })
      .then(function (itemCounts) {
        for (var item in itemCounts) {
          if (data[item]) {
            data[item].count += itemCounts[item].count;
          } else {
            for (var prop in item) {
              data[item].prop = itemCounts[item].prop;
            }
          }
          if (data[item.name].count > maxCount) {
            maxCount = data[item.name].count;
          }
        }
      })
  }
  }, data)

module.exports = {
  getRelatedItems: getRelatedItems
};