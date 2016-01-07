//// Services for authentication and obtainin data
//    -Functions for populating history and dashboard views
//    -Sign in and sign out functions
//
angular.module('associations.services', [])

.factory('Interests', function($http) {
  var addInterest = function(interest) {
    return $http({
      method: 'POST',
      url: '/api/interests',
      data: interest
    })
    .then(function(resp) {}());
  };

  return {
    addInterest: addInterest
  };
})

.factory('Auth', function($http, $location, $window) {
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(){});
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function(){});
  };

  var signout = function() {};

  return {
    signin: signin,
    signup: signup,
    signout: signout
  };
});
