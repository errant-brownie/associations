//// Module for the history of items user has liked
//    -Display all of the user's entered interests
//
angular.module('associations.history', [])

.controller('HistoryController', function ($scope, $http, History) {
  $scope.items = [];
  $scope.editing = false;

  // Query db for the user's stored likes then render them
  $scope.initialize = function() {
    History.getHistory()
      .then(function(resp) {
        for(var i = 0; i < resp.length; i++) {
          var item = resp[i];
          $scope.items.push(item);

          // Use the flickr API to get related pictures
          var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2fe873304c3096cb7755b84e7002f982&text='
           + item.name + '&tag='+ item.name + '&content_type=1&per_page=20&format=json&nojsoncallback=1';
          
          (function(arg){
            $http({
              method: 'GET',
              url: url
            }).then(function successCallback(response) {
                var random = Math.floor(Math.random() * 10);

                var result = response.data.photos.photo[random];
                var imgSrc = "http://farm"+ result.farm +".static.flickr.com/"+ result.server +"/"+ result.id +"_"+ result.secret +"_m.jpg";

                $scope.items[arg].url = imgSrc;
              }, function errorCallback(err) {
                console.log('Error: ', err);
              });
          })(i);
        }
      })
      .catch(function(err) {
        console.log('Error at history initialization: ', err);
      });
  }();

  $scope.removeItem = function(index) {
    var deleteItem = { name: $scope.items[index].name };
    History.removeItem(deleteItem)
      .then(function() {
        $scope.items.splice(index, 1);
        console.log('Successfully deleted: ', deleteItem);
      })
      .catch(function(err) {
        console.log('Error at removeItem: ', err);
      });
  };
});
