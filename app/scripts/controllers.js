'use strict';
angular.module('ExampleYo.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, $cordovaSQLite) {
  var map = L.map('map').setView([-35.178448,-58.53241], 4);
  var lyr = new L.TileLayer.MBTiles('', {maxZoom: 12, tms:true}, $cordovaSQLite, "bsas.mbtiles");
  map.addLayer(lyr); 
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
