'use strict';

describe('Controller: Index2Ctrl', function () {

  // load the controller's module
  beforeEach(module('arRealEstateApp'));

  var Index2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Index2Ctrl = $controller('Index2Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Index2Ctrl.awesomeThings.length).toBe(3);
  });
});
