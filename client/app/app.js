//// App module
//    -Home page is for when users first sign up and enter 3 interests
//    -History has not been implemented yet
//    -Auth is for signing up and signing in
//    -Services provide factories for authentication and adding items
//
angular.module('associations', [
  'associations.home',
  'associations.history',
  'associations.auth',
  'associations.services',
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
    })
    .otherwise({
      redirectTo: '/home'
    });;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
