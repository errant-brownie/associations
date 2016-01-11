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

  console.log('ITEMIDS!!!!!!!!!!!!!!!!!',itemIds)
  // for each item in the itemList array [ { id: 123, name: 'abc' }, { id: 124, name: 'xyz' } ]
  // return Promise.reduce(itemList, function (itemCounts, item) {
    // find all occurances of that item in the join table, expected to return array of { user_id: xx, item_id: yy } to the .then block
    return model.Item.findAll({ 
      where: {
        id: itemIds
      },
      include: [model.User]
    })
    .then(function (items) {
      // console.log('!!!!!!!!!!!!!!!!items: ', items);
      return items.reduce(function (accum, record) {
        console.log('accum: ', accum, record.user_id)
        record.Users.forEach(function(item) {
          accum.push(item.id);
        })
        return accum;
      }, [])
    })
    .each(function(item) {
      // console.log('array of shit: ', item)
      // return itemsController.getItemsForUsers(item)
      return model.User.findAll({
        where: {
          id: item
        },
        include: [ model.Item ]
      })
      .then(function (itemUsersRecords) {
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!each itemUsersRecords', itemUsersRecords[0])
        // find each item that this member 'likes'
        return itemUsersRecords.forEach(function (record) {
          // console.log('record.Items: ', record.Items);
          record.Items.forEach(function (recordItem) {
            // console.log('!!!!!!!!!!!!!!!itemcounts:',itemCounts)
            // this check is to make sure that none of the items in the itemList exist in the return array
            if (itemObj[recordItem.id] === undefined) {
              if (!!itemCounts[recordItem.id]) {
                itemCounts[recordItem.id].count++;
              } else {
                itemCounts[recordItem.id] = {};
                itemCounts[recordItem.id].id = recordItem.id;
                itemCounts[recordItem.id].name = recordItem.name;
                itemCounts[recordItem.id].count = 1;
                itemCounts[recordItem.id].strength = 0;
              }
              if (itemCounts[recordItem.id].count > maxCount) {
                maxCount = itemCounts[recordItem.id].count;
              }
            }
          })
        })
      })
    })
  .then(function () {
    // console.log('adsfadfssd',total);
    var results = [];

    for (var item in itemCounts) {
      itemCounts[item].strength = itemCounts[item].count / maxCount;
      results.push(itemCounts[item]);
    }

    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!total:',itemCounts)
    // for (var k = 0; k < total.length; k++) {
    //   console.log('asdsadafsdfsadfsadfsa', total[k].user_id);
    //   total[k].strength = total[k].count / maxCount;
    // }
    // // console.log('each item: ', total)
    console.log('results: ', results);
    return results;
  })
};

module.exports = {
  getRelatedItems: getRelatedItems
};

var testItem = [{id: 1}, {id:2}, {id:3}];
var testGRI = getRelatedItems(testItem);
console.log(testGRI);