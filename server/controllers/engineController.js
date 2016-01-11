var model = require('../db/dbModel.js');
var itemsController = require('./itemsController');
var Promise = require('bluebird');

// The heart of the project...
// The order of operations is as follows:
// 1) Find all users associated with item
// 2) Find all items associated with users
// 3) Add all items to the data object and increment counts associated with items
// 4) Calculate resulting strength of association (count / maxCount)
// 5) Return array of objects consisting of {id: item.id, name: item.name, strength: (calculated strength) }

var getRelatedItems = function (itemList) {
  var itemObj = {};
  var data = {}; 

  // max count for calculating relational strength
  var maxCount = 0;

  // translate itemList into object for fast referencing
  for (var j = 0; j < itemList.length; j++) {
    itemObj[itemList[j].id] = 1;
  };

  console.log('itemObj: ', itemObj)

  // for each item in the itemList array [ { id: 123, name: 'abc' }, { id: 124, name: 'xyz' } ]
  return Promise.reduce(itemList, function (itemCounts, item) {
    // find all occurances of that item in the join table, expected to return array of { user_id: xx, item_id: yy } to the .then block
    console.log('item: ', item)
    return model.ItemUser.findAll({ 
      where: {
        item_id: item.id
      }
    })
    .then(function (items) {
      console.log('itemid: ', item)
      var arr = []
      return Promise.each(items, function (item) {
        console.log('reduce item: ', item.dataValues)
        arr.push(item.dataValues.user_id);
      })
      .then(function() {
        return itemsController.getItemsForUsers(arr)
      })
      // return arr;
    })
    .spread(function (item) {
      // find each item that this member 'likes'
      // console.log('item: ', item)
      console.log('arg length: ', arguments)
      Promise.each(arguments, function (item) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',item.dataValues);
        if (itemObj[item.dataValues.id] === undefined) {
          if (!!itemCounts[item.dataValues.id]) {
            itemCounts[item.dataValues.id].count++;
          } else {
            itemCounts[item.dataValues.id] = {};
            itemCounts[item.dataValues.id].id = item.id;
            itemCounts[item.dataValues.id].count = 1;
            itemCounts[item.dataValues.id].strength = 0;
          }
          console.log('item counts: ', itemCounts)
          console.log('maxCount', maxCount)
          if (itemCounts[item.dataValues.id].count > maxCount) {
            maxCount = itemCounts[item.dataValues.id].count;
          }
        }
      })
      return itemCounts;
    })
  }, {})
  .then(function (total) {
    console.log('total', total);
  })
};

module.exports = {
  getRelatedItems: getRelatedItems
};

// var testItem = [{id: 1}, {id:2}, {id:3}];
// var testGRI = getRelatedItems(testItem);
