var model = require('../db/dbModel.js');
var Promise = require('bluebird');

// The heart of the project...
// The order of operations is as follows:
// 1) Find all users associated with item
// 2) Find all items associated with users
// 3) Add all items to the data object and increment counts associated with items
// 4) Calculate resulting strength of association (count / maxCount)
// 5) Return array of objects consisting of {id: item.id, name: item.name, strength: (calculated strength) }

// inputs:
//  array of:
//    { id: xx, .... }
// 
// outputs:
//  array of:
//    { item: { associated item object }, strength: 0.000 - 1.000, count: 123 }

var getRelatedItems = function (itemList) {
  // max count for calculating relational strength
  var maxCount = 0;
  var itemCounts = {};

  // translate itemList into object for fast referencing
  var itemObj = {};
  var itemIds = [];
  for (var i = 0; i < itemList.length; i++) {
    itemObj[itemList[i].id] = 1;
    itemIds.push(itemList[i].id);
  };

  // find all occurances of itemIds in item table
  return model.Item.findAll({ 
    where: {
      id: itemIds
    },
    include: [model.User]
  })
  // expected input to be array of { items } to the .then block
  .then(function (items) {
    return items.reduce(function (accum, record) {
      record.Users.forEach(function(item) {
        accum.push(item.id);
      })
      return accum;
    }, []);
  })
  .each(function(item) {
    return model.User.findAll({
      where: {
        id: item
      },
      include: [ model.Item ]
    })
    .then(function (itemUsersRecords) {
      // find each item that this member 'likes'
      return itemUsersRecords.forEach(function (recordsArr) {
        recordsArr.Items.forEach(function (recordItem) {
          // deletes unnecessary data from item object
          delete recordItem.dataValues.item_user;
          // this check is to make sure that none of the items in the itemList exist in the return array
          if (itemObj[recordItem.id] === undefined) {
            if (!!itemCounts[recordItem.id]) {
              itemCounts[recordItem.id].count++;
            } else {
              itemCounts[recordItem.id] = {};
              itemCounts[recordItem.id].item = recordItem.dataValues;
              itemCounts[recordItem.id].count = 1;
              itemCounts[recordItem.id].strength = 0;
            }
            if (itemCounts[recordItem.id].count > maxCount) {
              maxCount = itemCounts[recordItem.id].count;
            }
          }
        })
      });
    })
  })
  .then(function () {
    var results = [];

    for (var item in itemCounts) {
      itemCounts[item].strength = itemCounts[item].count / maxCount;
      results.push(itemCounts[item]);
    }
    console.log(results);
    return results;
  })
};

module.exports = {
  getRelatedItems: getRelatedItems
};

// var testItem = [{id: 1}, {id:2}, {id:3}];
// var testGRI = getRelatedItems(testItem);
// console.log(testGRI);
