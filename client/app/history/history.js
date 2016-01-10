//// Module for the history of items user has liked
//    -Display all of the user's entered interests
//
angular.module('associations.history', [])

.controller('HistoryController', function ($scope, History) {
  $scope.items = {};

  $scope.initialize = function() {

  };
});
