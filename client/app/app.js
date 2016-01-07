//// App module
//
angular.module('associations', [
  'associations.dashboard',
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
    .when('/dashboard', {
      templateUrl: '/app/dashboard/dashboard.html',
      controller: 'DashboardController',
      authenticate: true
    })
    .when('/history', {
      templateUrl: '/app/history/history.html',
      controller: 'HistoryController',
      authenticate: true
    });
});
