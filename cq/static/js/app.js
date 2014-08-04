'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
//        ,
//  'angular-loading-bar'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clusters', {templateUrl: '/mergely/static/partials/clusters.html', controller: 'listClusterCtrl'});
  $routeProvider.when('/clusters/:id', {templateUrl: '/mergely/static/partials/clusterDetail.html', controller: 'clusterDetailCtrl'});
  $routeProvider.otherwise({redirectTo: '/clusters'});
  $routeProvider.when('/topics', {templateUrl: '/mergely/static/partials/topics.html', controller: 'topicCtrl'});
  $routeProvider.when('/topics/:id', {templateUrl: '/mergely/static/partials/topicDetail.html', controller: 'topicDetailCtrl'});
  
}]);
