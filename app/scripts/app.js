'use strict';

/**
 * @ngdoc overview
 * @name arRealEstateApp
 * @description
 * # arRealEstateApp
 *
 * Main module of the application.
 */
angular
  .module('arRealEstateApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/index2', {
        templateUrl: 'views/index2.html',
        controller: 'Index2Ctrl',
        controllerAs: 'index2'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
