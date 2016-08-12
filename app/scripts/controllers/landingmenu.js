'use strict';

/**
 * @ngdoc function
 * @name arRealEstateApp.controller:LandingmenuCtrl
 * @description
 * # LandingmenuCtrl
 * Controller of the arRealEstateApp
 */
angular.module('arRealEstateApp')
  .controller('LandingmenuCtrl', function ($scope) {
  	$scope.showAlert = function(){
  		alert("This is a sudo box..");
  	}
  });
