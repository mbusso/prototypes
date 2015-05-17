'use strict';

angular.module('contentBuilderApp')
.controller('TravelerEditCtrl', function ($scope, Traveler, travelerToUpdate) {

	$scope.traveler = travelerToUpdate;

	$scope.save = function() {		
		Traveler.update($scope.traveler).$promise.then(function() {
			$scope.feedback = "traveler updated";
		}, function(error){
			$scope.feedback = error;
		});
	};	
})