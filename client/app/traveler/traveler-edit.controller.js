'use strict';

angular.module('contentBuilderApp')
.controller('TravelerEditCtrl', function ($scope, $state, Traveler, travelerToUpdate) {

	$scope.traveler = travelerToUpdate;

	$scope.save = function() {		
		Traveler.update($scope.traveler).$promise.then(function() {
			$scope.feedback = "traveler updated";
			$state.go('traveler-list');
		}, function(error){
			$scope.feedback = error;
		});
	};	
})