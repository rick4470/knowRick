'use strict';
angular.module('mean.users').controller('loginController', ['$scope', '$rootScope', '$http', '$location', 'Global',
  function($scope, $rootScope, $http, $location, Global) {
    $scope.user = {};
    $scope.global = Global;

    // Register the login() function
    $scope.login = function() {
      $http.post('/login', {
          username: $scope.user.username,
          password: $scope.user.password
        })
        .success(function(response) {
          // authentication OK
          $scope.loginError = 0;
          $rootScope.user = response.user;
          $rootScope.$emit('loggedin');
          if (response.redirect) {
            if (window.location.href === response.redirect) {
              //This is so an admin user will get full admin page
              window.location.reload();
            } else {
              window.location = response.redirect;
            }
          } else {
            $location.url('/');
          }
        })
        .error(function() {
          $scope.loginerror = 'Authentication failed.';
        });
    };
  }
]);