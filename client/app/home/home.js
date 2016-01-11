//// Module for the user's home page
//    -This is where the user views all new recommendations
//    -Functions as their feed
//
angular.module('associations.home', [])

.controller('HomeController', function ($scope, $http, Items) {
  $scope.formShow = true;
  $scope.data = [];

  //// Function for adding the user's interests to the database
  $scope.addItems = function(items) {
    $scope.formShow = false;
    var itemsArray = [];

    // Build up array for sending the POST request
    for(var i = 0; i < items.length; i++) {
      var item = {name: items[i]};
      itemsArray.push(item);
    }

    Items.addItems(itemsArray)
      .then(function(resp){
        console.log('Successful addition! ', resp);
      })
      .catch(function(error) {
        console.log('Error at addItems: ', error);
      });
  };

  $scope.dummyData = [{name:"tomato"}, {name:"cake"}, {name:"bed"}, {name:"fruit"}, {name:"swimming"}, {name:"bird"}];

  //// Function for displaying the photos of each recommendation
  $scope.renderRecs = function(recs) {
    for(var i = 0; i < $scope.dummyData.length; i++) {
      var rec = $scope.dummyData[i];
      
      // The function enclosed in parentheses is used for keeping
      // the right index - this is necessary due to asynchronisity
      (function(rec, arg) {

        // Call the service for obtaining Flickr image
        Items.getItemImage(rec, arg)
        .then(function(response) {
          $scope.dummyData[response.index].url = response.url;
        })
        .catch(function(response) {
          console.log('Error at renderRecs: ', response);
        });
      })(rec, i);
    }
  }();

});
