(function(){

angular.module('ngCordova.plugins.sqlDbCopy', [])
	.factory('$cordovaSqlDbCopy',  ['$q', '$window', function ($q, $window) {

    return {

    copy: function (databaseName) {

      var q = $q.defer();

      $window.plugins.sqlDB.copy(databaseName,function() {
      	q.resolve();
      },
      function(error) { 
        q.reject(err);
    });
        return q.promise;
      }
    };
  }
  ]);
})();