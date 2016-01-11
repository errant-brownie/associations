//// Services for authentication and obtainin data
//    -Functions for populating history and dashboard views
//    -Sign in and sign out functions
//    -Item adding functionality
//
//    **Need to finish authentication once back-end auth is done
//
angular.module('associations.services', [])

.factory('Items', function($http) {
  var addItem = function(item) {
    return $http({
      method: 'POST',
      url: '/api/items',
      data: item
    })
    .then(function(resp) {}());
  };

  return {
    addItem: addItem
  };
})

.factory('Auth', function($http, $location, $window) {
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (response) {
      return response.data.message;
    });
  };

  var signup = function(user) {
    var data = {};
    data.user = user;
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: data
    })
    .then(function (response) {
      return response.data.token;
    });
  };

  var signout = function() {};

  return {
    signin: signin,
    signup: signup,
    signout: signout
  };
})

.factory('History', function($http) {
  var getHistory = function() {
    return $http({
      method: 'GET',
      url: '/api/items',
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var removeItem = function(item) {
    return $http({
      method: 'DELETE',
      url: '/api/items',
      data: item
    })
    .then(function(resp) {
      console.log('Deleted: ', resp);
    });
  };

  return {
    getHistory: getHistory,
    removeItem: removeItem
  };
});
