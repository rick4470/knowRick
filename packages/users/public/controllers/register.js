'use strict';
angular.module('mean.users').controller('registerController', ['$scope', '$rootScope', '$http', '$location', 'Global',
  function($scope, $rootScope, $http, $location, Global) {
    $scope.user = {};
    $scope.global = Global;

    $scope.register = function() {
      $scope.msg = null;
      $http.post('/register', {
        secret: $scope.user.secret,
        username: $scope.user.username,
        email: $scope.user.email,
        name: $scope.user.name,
        password: $scope.user.password,
        confirmPassword: $scope.user.confirmPassword,
      })
        .success(function() {
          $scope.registerError = 0;
          $rootScope.user = $scope.user;
          Global.user = $rootScope.user;
          Global.authenticated = !! $rootScope.user;
          $rootScope.$emit('loggedin');
          $location.url('/');
        })
        .error(function(data) {
          $scope.msg = data.msg;
        });
    };
  }
]);