'use strict';

describe('Controller: BusinesscentreCtrl', function () {

  // load the controller's module
  beforeEach(module('arRealEstateApp'));

  var BusinesscentreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusinesscentreCtrl = $controller('BusinesscentreCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BusinesscentreCtrl.awesomeThings.length).toBe(3);
  });
});
