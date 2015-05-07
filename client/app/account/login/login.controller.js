'use strict';

angular.module('contentBuilderApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.user.email = 'admin@admin.com';
    $scope.user.password = 'admin';
    $scope.errors = {};


    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          $location.path('/main');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
