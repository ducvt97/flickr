'use strict';

angular.
  module('myflickrApp').
  config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise("/");
      
      $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
              });
      $stateProvider.state('home', {
        url: '/',
        template: '<explore>'
      });

      $stateProvider.state('explore', {
        url: '/explore',
        template: '<explore>'
      });

      $stateProvider.state('user', {
        url: '/user/:user_id',
        template: '<user>'
      });

      $stateProvider.state('search', {
        url: '/search?searchKey',
        template: '<search>'
      });
    }
  ]);