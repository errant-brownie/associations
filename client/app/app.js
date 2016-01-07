//// App module
//
angular.module('associations', [
  'associations.home',
  'associations.history',
  'associations.auth,'
  'ngRoute'
])
//// Front-end routes
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: '/app/auth/signin.html',
      controller: 'AuthController',
      authenticate: false
    })
    .when('/signup', {
      templateUrl: '/app/auth/signup.html',
      controller: 'AuthController',
      authenticate: false
    })
    .when('/home', {
      templateUrl: '/app/home/home.html',
      controller: 'HomeController',
      authenticate: true
    })
    .when('/history', {
      templateUrl: '/app/history/history.html',
      controller: 'HistoryController',
      authenticate: true
    });
});
