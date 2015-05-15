'use strict';

angular.module('contentBuilderApp')
.controller('TravelerListCtrl', function ($scope, $http, Traveler, travelers) {

	$scope.itemsByPage=15;
	$scope.rowCollection = travelers;

	$scope.searchTravelers = function(config) {
		return $http.get('/api/travelers/', config);
	};

	$scope.delete = function(traveler, index) {	
		Traveler.remove( {id: traveler._id}, function(travelerDeleted){
			$scope.rowCollection.splice(index, 1);
		});
	}

	

	// var
	// nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
	// familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

	// function createRandomItem() {
	// 	var
	// 	firstName = nameList[Math.floor(Math.random() * 4)],
	// 	lastName = familyName[Math.floor(Math.random() * 4)],
	// 	age = Math.floor(Math.random() * 100),
	// 	email = firstName + lastName + '@whatever.com',
	// 	balance = Math.random() * 3000;

	// 	return{
	// 		firstName: firstName,
	// 		lastName: lastName,
	// 		age: age,
	// 		email: email,
	// 		balance: balance
	// 	};
	// }

	// $scope.itemsByPage=15;

	// $scope.rowCollection = [];
	// for (var j = 0; j < 200; j++) {
	// 	$scope.rowCollection.push(createRandomItem());
	// }
})