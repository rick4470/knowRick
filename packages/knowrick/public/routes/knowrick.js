'use strict';

angular.module('mean.knowrick').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('knowrick example page', {
      url: '/knowrick/example',
      templateUrl: 'knowrick/views/index.html'
    });
  }
]);
