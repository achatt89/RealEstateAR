'use strict';

describe('Controller: LandingmenuCtrl', function () {

  // load the controller's module
  beforeEach(module('arRealEstateApp'));

  var LandingmenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LandingmenuCtrl = $controller('LandingmenuCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LandingmenuCtrl.awesomeThings.length).toBe(3);
  });
});
