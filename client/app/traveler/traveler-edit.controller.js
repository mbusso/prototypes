'use strict';

angular.module('contentBuilderApp')
.controller('TravelerEditCtrl', function ($scope, travelerToUpdate) {

	$scope.traveler = travelerToUpdate;

	$scope.save = function() {
		$scope.traveler.$update().$promise.then(function() {
			$scope.feedback = "traveler updated";
		}, function(error){
			$scope.feedback = error;
		});
	};	
})