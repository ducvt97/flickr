'use strict';

angular.
  module('myflickrApp').
  config(['$routeProvider', '$locationProvider',
    function config($routeProvider, $locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      $locationProvider.hashPrefix(); 
      $routeProvider.
        when('/', {
          template: '<justified-gallery></justified-gallery>',
        }).
        // when('/phones/:phoneId', {
        //   template: '<explore></explore>'
        // }).
        otherwise('/');
    }
  ]);