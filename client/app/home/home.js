//// Module for the user's home page
//    -This is where the user views all new recommendations
//    -Functions as their feed
//
angular.module('associations.home', [])

.controller('HomeController', function ($scope, $http, Items) {
  $scope.formShow = true;
  $scope.data = [];
  $scope.associations = [];

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
        $scope.renderRecs();
        $scope.data = [];
      })
      .catch(function(error) {
        console.log('Error at addItems: ', error);
      });
  };

  $scope.dummyData = [{name:"tomato"}, {name:"cake"}, {name:"bed"}, {name:"fruit"}, {name:"swimming"}, {name:"bird"}];

  //// Function for displaying the photos of each recommendation
  $scope.renderRecs = function() {
    Items.getAssociations()
      .then(function(resp) {
        $scope.associations = [];

        var results = resp;

        for(var i = 0; i < results.length; i++) {
          var association = results[i];

          (function(association, arg) {
            // Call the service for obtaining Flickr image
            Items.getItemImage(association.item.name, arg)
            .then(function(response) {
              association.url = response.url;
              $scope.associations.push(association);
            })
            .catch(function(response) {
              console.log('Error at renderRecs: ', response);
            });
          })(association, i);
        }
      });
  };
});
