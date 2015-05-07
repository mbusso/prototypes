'use strict';

angular.module('contentBuilderApp')
.controller('TravelerCtrl', function ($scope, Traveler) {
  $scope.traveler = {};

  $scope.save = function() {
    Traveler.save($scope.traveler).$promise.then(function() {
      $scope.feedback = "traveler saved";
    }, function(error){
      $scope.feedback = error;
    });
  };

});
