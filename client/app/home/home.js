//// Module for the user's home page
//    -This is where the user views all new recommendations
//    - Functions as their feed
//
angular.module('associations.home', [])

.controller('HomeController', function ($scope, Interests) {
  $scope.data = [];

  $scope.addInterests = function(interests) {
    for(var i = 0; i < interests.length; i++) {
      Interests.addInterest(interests[i])
        .then(function(resp){})
        .catch(function(error) {
          console.log('Error at addInterests: ', error);
        });
    }
  };
});
