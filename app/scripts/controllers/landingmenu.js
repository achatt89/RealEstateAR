'use strict';

/**
 * @ngdoc function
 * @name arRealEstateApp.controller:LandingmenuCtrl
 * @description
 * # LandingmenuCtrl
 * Controller of the arRealEstateApp
 */
angular.module('arRealEstateApp')
  .controller('LandingmenuCtrl', function ($scope, $location) {
  	$scope.location = $location;
  	$scope.showAlert = function(){
  		alert("This is a sudo box..");
  	}

  	$scope.routeToLandingMenu = function(){
  	  if(this.location){
  	    this.location.url('businessCentre');  	  	
  	  }
  	}
  });
