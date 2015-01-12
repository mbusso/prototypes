'use strict';

describe('Controller: DashCtrl', function () {

  var should = chai.should();

  // load the controller's module
  beforeEach(module('ExampleYo'));

  var DashCtrl,scope;

 // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashCtrl = $controller('DashCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of friend to the scope', function () {
    scope.isOk.should.to.be.true;
  });

});
