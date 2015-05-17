'use strict';

angular.module('contentBuilderApp')
.controller('TravelerCtrl', function ($scope, $state, Traveler) {
  $scope.traveler = {};

  $scope.save = function() {
    Traveler.save($scope.traveler).$promise.then(function() {
      $scope.feedback = "traveler saved";
      $state.go('traveler-list');
    }, function(error){
      $scope.feedback = error;
    });
  };

});
