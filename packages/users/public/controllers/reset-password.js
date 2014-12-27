'use strict';
angular.module('mean.users').controller('resetPasswordController', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'Global',
  function($scope, $rootScope, $http, $location, $stateParams, Global) {
    $scope.user = {};
    $scope.global = Global;

    $scope.resetpassword = function() {
      $http.post('/reset/' + $stateParams.tokenId, {
        password: $scope.user.password,
        confirmPassword: $scope.user.confirmPassword
      })
      .success(function(response) {
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
      .error(function(error) {
        if (error.msg === 'Token invalid or expired')
          $scope.resetpassworderror = 'Could not update password as token is invalid or may have expired';
        else
          $scope.validationError = error;
      });
    };
  }
]);
