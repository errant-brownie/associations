//// Services for authentication and obtaining data
//    -Functions for populating history and recommendation views
//    -Sign in and sign out functions
//    -Item adding functionality
//
//    **Need to finish authentication once back-end auth is done
//
angular.module('associations.services', [])

.factory('Items', function($http) {

  //// This method is for when the user first signs up
  //    -The user is required to enter a minimum of 3 items
  //
  var addItems = function(items) {
    return $http({
      method: 'POST',
      url: '/api/items',
      data: items
    })
    .then(function(resp) {}());
  };

  var getAssociations = function() {
    return $http({
      method: 'GET',
      url: '/api/associations'
    })
    .then(function(resp) {
      console.log('getAssociations response: ', resp);
      return resp.data;
    });
  };

  //// This method is for obtaining an image url from the Flickr API
  // The url format is as follows:
  // src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
  //
  var getItemImage = function(item, index) {

    // Format the URL for querying the Flickr API
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2fe873304c3096cb7755b84e7002f982&text='
     + item.name + '&tag='+ item.name + '&content_type=1&per_page=20&format=json&nojsoncallback=1';

    return $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
      var random = Math.floor(Math.random() * 10);

      // Obtain a random photo from the results of querying Flickr API
      var result = response.data.photos.photo[random];
      var imgSrc = "http://farm"+ result.farm +".static.flickr.com/"+ result.server +"/"+ result.id +"_"+ result.secret +"_m.jpg";

      return {
        index: index, 
        url: imgSrc 
      };
    }).catch(function errorCallback(response) {
      console.log('Error at getItemImages: ', err);
    });
  };

  return {
    addItems: addItems,
    getItemImage: getItemImage,
    getAssociations: getAssociations
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
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (response) {
      return response.data.message;
    });
  };
  
  var isAuth = function () {
    return !!$window.localStorage.getItem('com.associations.authenticated');
  };

  var signout = function() {
    $window.localStorage.removeItem('com.associations.authenticated');
    return $http({
      method: 'GET',
      url: '/signOut'
    });
  };

  return {
    signin: signin,
    signup: signup,
    signout: signout,
    isAuth: isAuth
  };
})



.factory('History', function($http) {

  //// This is for obtaining a list of al the items the user has entered
  //     
  var getHistory = function() {
    return $http({
      method: 'GET',
      url: '/api/items',
    })
    .then(function(resp){
      console.log(resp);
      return resp.data;
    });
  };

  //// This is for allowing the user to remove items from their history
  //
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
