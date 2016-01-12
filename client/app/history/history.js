//// Module for the history of items user has liked
//    -Display all of the user's entered interests
//
//    ** History does not work properly when the user is not
//       signed in yet!
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

          // The function enclosed in parentheses is used for keeping
          // the right index - this is necessary due to asynchronisity
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

  // This allows users to remove items they are no longer interested in
  $scope.removeItem = function(index) {
    // Format the item to delete before request is made
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
