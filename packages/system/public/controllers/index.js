'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$http',
  function($scope, Global, $http) {
    $scope.global = Global;

    $scope.pageInit = function () {
      $http.get('/latest-page').success(function(data) {
        $scope.page = data;
      });
    };
  }
]);
