//// Services for authentication and obtainin data
//    -Functions for populating history and dashboard views
//    -Sign in and sign out functions
//
angular.module('associations.services', [])

.factory('Auth', function($http, $location, $window) {
  var signin = function(user) {};

  var signup = function(user) {};

  var signout = function() {};

  return {
    signin: signin,
    signup: signup,
    signout: signout
  };
});
