//// Module for the user's home page
//    -This is where the user views all new recommendations
//    -Functions as their feed
//
angular.module('associations.home', [])

.controller('HomeController', function ($scope, Items, $http) {
  $scope.formShow = true;
  $scope.data = [];

  $scope.addItems = function(items) {
    $scope.formShow = false;

    for(var i = 0; i < items.length; i++) {
      var item = {name: items[i]};
      Items.addItem(item)
        .then(function(resp){
          console.log('Successful addition! ', resp);
        })
        .catch(function(error) {
          console.log('Error at addItems: ', error);
        });
    }
  };
//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=44ae497a4c4a7f8eb0dee6d4489cf84a&tags=dog&format=json&nojsoncallback=1

  $scope.dummyData = [{title:"tomato"}, {title:"america"}, {title:"computer"}, {title:"fruit"}, {title:"swimming"}, {title:"bird"}];
  $scope.renderRecs = function(recs) {
    for(var i = 0; i < $scope.dummyData.length; i++) {
      var rec = $scope.dummyData[i];
      var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2fe873304c3096cb7755b84e7002f982&text='
       + rec.title + '&tag='+ rec.title + '&content_type=1&per_page=20&format=json&nojsoncallback=1';

       console.log(url);
(function(arg){
      $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
          var random = Math.floor(Math.random() * 10);
          console.log(random);
          var item = response.data.photos.photo[random];
          var imgSrc = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
          console.log($scope.dummyData[arg]);
          $scope.dummyData[arg].url = imgSrc;
          console.log(imgSrc)
          console.log($scope.dummyData[arg]);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log("ERROR");
        });
})(i);

    }
  }();
  
//src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";


});
