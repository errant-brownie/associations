var engine = require('../controllers/engineController.js')

var getAssociations = function (request, response, next){
  response.json([
    {item: {name: "videogames"}, strength: 0.809},
    {item: {name: "cats"}, strength: 0.724},
    {item: {name: "computers"}, strength: 0.934},
    {item: {name: "essays"}, strength: 0.002},
    {item: {name: "pizza"}, strength: 0.538}
  ]);
},

var postAssociations = function(request,response,next){
  response.json([
    {item: {name: "videogames"}, strength: 0.809},
    {item: {name: "cats"}, strength: 0.724},
    {item: {name: "computers"}, strength: 0.934},
    {item: {name: "essays"}, strength: 0.002},
    {item: {name: "pizza"}, strength: 0.538}
  ]);
}
module.exports = {
  getAssociations: getAssociations,
  postAssociations: postAssociations,
};
