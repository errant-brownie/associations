//// Module for the user's dashboard
//    -This is where the user views all new recommendations
//    - Functions as their feed
//
angular.module('associations.home', [])

.controller('HomeController', function ($scope, Interests) {
  $scope.interests = [];

  // Uses the Interests factory in services.js for this function
  // Iterates over all the interests the user inputs and performs
  // a POST request for each one
  //
  $scope.addInterests = function(interests) {
    for(var i = 0; i < interests.length; i++) {
      var responseBody = Interests.addInterest({
        interest: $scope.interests[i]
      })
      // Should we do something with the response?
      .then(function(){})
      .catch(function(){
        console.log('Error during addInterests!');
      });
    }
  };
});
