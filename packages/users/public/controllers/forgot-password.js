'use strict';
angular.module('mean.users').controller('forgotPasswordController', ['$scope', '$rootScope', '$http', '$location', 'Global',
  function($scope, $rootScope, $http, $location, Global) {
    $scope.user = {};
    $scope.global = Global;
    $scope.global.registerForm = false;
    $scope.forgotpassword = function() {
      $http.post('/forgot-password', {
        text: $scope.user.email
      })
        .success(function(response) {
          $scope.response = response;
        })
        .error(function(error) {
          $scope.response = error;
        });
    };
  }
]);