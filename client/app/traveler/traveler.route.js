'use strict';

angular.module('contentBuilderApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('traveler-new', {
        url: '/traveler/new',
        templateUrl: 'app/traveler/traveler-new.html',
        controller: 'TravelerCtrl'
      });
  });