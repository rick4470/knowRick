'use strict';

/* jshint -W098 */
angular.module('mean.knowrick').controller('KnowrickController', ['$scope', 'Global', 'Knowrick',
  function($scope, Global, Knowrick) {
    $scope.global = Global;
    $scope.package = {
      name: 'knowrick'
    };
  }
]);
