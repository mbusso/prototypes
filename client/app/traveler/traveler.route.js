'use strict';

angular.module('contentBuilderApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('traveler-new', {
    url: '/traveler/new',
    templateUrl: 'app/traveler/traveler-new.html',
    controller: 'TravelerCtrl'
  })
  .state('traveler-list', {
    url: '/traveler/list',
    templateUrl: 'app/traveler/list/traveler-list.html',
    controller: 'TravelerListCtrl',
    resolve: {
      travelers: function(Traveler){
        return Traveler.query().$promise;
      }
    }
  });
});