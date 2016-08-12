'use strict';

/**
 * @ngdoc function
 * @name arRealEstateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the arRealEstateApp
 */
angular.module('arRealEstateApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.videoEnd = function() {
    	$location.path('landingMenu');
    };
  });
