'use strict';

angular.module('contentBuilderApp')
.factory('Traveler', function ($resource) {
	return $resource('/api/travelers/:id', { id: '@_id' } , {
		update: {
			method: 'PUT'        
		}
	});
});
