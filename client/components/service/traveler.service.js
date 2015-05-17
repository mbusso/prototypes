'use strict';

angular.module('contentBuilderApp')
.factory('Traveler', function ($resource) {
	return $resource('/api/travelers/:id', null , {
		update: {
			method: 'PUT'        
		}
	});
});
