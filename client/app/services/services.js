//// Services for authentication and obtainin data
//    -Functions for populating history and dashboard views
//    -Sign in and sign out functions
//
angular.module('associations.services', [])

//// Factory for adding new interests to the user's profile
//
.factory('Interests', function($http) {
  var addInterest = function(link) {
    return $http({
      method: 'POST',
      url: '/api/interests',
      data: link
    })
    .then(function(resp) {
      return resp;
    });
  };

  return {
    addInterest: addInterest
  };
})

.factory('Auth', function($http, $location, $window) {
  // The user object will have 'username' and 'password' properties
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };

  var signout = function() {};

  return {
    signin: signin,
    signup: signup,
    signout: signout
  };
});
