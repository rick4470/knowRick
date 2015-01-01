'use strict';

angular.module('mean.system').controller('ContactController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;

    $scope.isCollapsed = true;
  }
]);
