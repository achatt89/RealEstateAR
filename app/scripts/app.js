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
    'ngTouch',
    'ui.event',
    'ui.bootstrap'
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
      .when('/landingMenu', {
        templateUrl: 'views/landingmenu.html',
        controller: 'LandingmenuCtrl',
        controllerAs: 'landingMenu'
      })
      .when('/businessCentre', {
        templateUrl: 'views/businesscentre.html',
        controller: 'BusinesscentreCtrl',
        controllerAs: 'businessCentre'
      })
      .when('/gym', {
        templateUrl: 'views/gym.html',
        controller: 'GymCtrl',
        controllerAs: 'gym'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
