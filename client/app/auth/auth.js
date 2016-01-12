//// Authentication module
//    -This application uses Passport for authentication
//
angular.module('associations.auth', [])

.controller('AuthController', function($scope, $window, $location, Auth) {
  $scope.user = {};

  // Uses Auth factory's functions, passing in a user object
  // with properties 'username' and 'password'
  $scope.signin = function() {
    Auth.signin($scope.user)
      .then(function (token) {
        // Should probably save a token, but right now it just
        // saves the string "Authenticated" because that's what
        // the server returns
        $window.localStorage.setItem('com.associations.authenticated', token);
        $location.path('/');
      })
      .catch(function(error) {
        console.log('Error at signin: ', error);
      });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.associations.authenticated', token);
        $location.path('/');
      })
      .catch(function(error) {
        console.log('Error at signup: ', error);
      });
  };
});
