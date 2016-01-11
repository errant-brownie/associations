//// Module for the history of items user has liked
//    -Display all of the user's entered interests
//
angular.module('associations.history', [])

.controller('HistoryController', function ($scope, $http, History, Items) {
  $scope.items = [];
  $scope.editing = false;

  // Query db for the user's stored likes then render them
  $scope.initialize = function() {
    History.getHistory()
      .then(function(resp) {

        // This is for looping through the user's history and obtaining
        // images for each
        for(var i = 0; i < resp.length; i++) {
          var item = resp[i];
          $scope.items.push(item);

          (function(item, arg) {
            Items.getItemImage(item, arg)
            .then(function(response) {
              $scope.items[response.index].url = response.url;
            })
            .catch(function(response) {
              console.log('Error at history\'s initialize: ', response);
            });
          })(item, i);
        }
      })
      .catch(function(err) {
        console.log('Error at history initialization: ', err);
      });
  }();

  $scope.removeItem = function(index) {
    var deleteItem = { name: $scope.items[index].name };
    History.removeItem(deleteItem)
      .then(function() {
        $scope.items.splice(index, 1);
        console.log('Successfully deleted: ', deleteItem);
      })
      .catch(function(err) {
        console.log('Error at removeItem: ', err);
      });
  };
});
