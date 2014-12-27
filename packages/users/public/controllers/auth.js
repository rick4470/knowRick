'use strict';
angular.module('mean.users').controller('authController', ['$scope', '$rootScope', '$http', '$location', 'Global',
  function($scope, $rootScope, $http, $location, Global) {
    $scope.global = Global;
  }
]);