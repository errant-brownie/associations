module.exports = {
  getAll: function (request, response, next){
    response.json([
      {name: "video games"},
      {name: "cats"},
      {name: "computers"},
      {name: "ui design"},
    ]);
  },

  add: function(request, response, next){
    response.json(request.body);
  }
}
