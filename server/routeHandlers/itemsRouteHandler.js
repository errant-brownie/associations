var Items = require('../controllers/itemsController');

var getAll = function (request, response, next){
  response.json([
    {name: "video games"},
    {name: "cats"},
    {name: "computers"},
    {name: "ui design"},
  ]);
},

var add = function(request, response, next){
  response.json(request.body);
};

module.exports = {
  getAll: getAll;
  add: add;
}
