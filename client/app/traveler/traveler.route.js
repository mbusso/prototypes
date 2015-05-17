'use strict';

angular.module('contentBuilderApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('traveler-new', {
    url: '/traveler/new',
    templateUrl: 'app/traveler/traveler-new.html',
    controller: 'TravelerCtrl'
  })
  .state('traveler-edit', {
    url: '/traveler/edit/{travelerId:string}',
    templateUrl: 'app/traveler/traveler-new.html',
    controller: 'TravelerEditCtrl',
    resolve: {
      travelerToUpdate: function($stateParams, Traveler) {
        return Traveler.get( {id:$stateParams.travelerId} ).$promise;
      }      
    }
  })
  .state('traveler-list', {
    url: '/traveler/list',
    templateUrl: 'app/traveler/list/traveler-list.html',
    controller: 'TravelerListCtrl'
  });
});