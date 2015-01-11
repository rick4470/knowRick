'use strict';

angular.module('mean.system').controller('ContactController', ['$scope', 'Global',
  '$http',
  function($scope, Global, $http) {
    $scope.global = Global;
    $scope.sendMessage = false;

    $scope.processForm = function(){
      $http({
        method  : 'POST',
        url     : '/contact',
        data    : $scope.formData,
        headers : { 'Content-Type': 'application/json' }
      }).success(function(data, status, headers, config) {
        $scope.sendMessage = true;
      }).error(function(data, status, headers, config) {
        if (status === 500) {
          $scope.msg = data.error;
        }
      });
      
    };
  }
]);
