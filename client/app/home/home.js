//// Module for the user's home page
//    -This is where the user views all new recommendations
//    -Functions as their feed
//
angular.module('associations.home', [])

.controller('HomeController', function ($scope, Items) {
  $scope.data = [];

  $scope.addItems = function(items) {
    console.log(items);
    for(var i = 0; i < items.length; i++) {
      var item = {name: items[i]};
      Items.addItem(item)
        .then(function(resp){
          console.log('Successful addition! ', resp);
        })
        .catch(function(error) {
          console.log('Error at addItems: ', error);
        });
    }
  };
});
