'use strict';

angular.module('mean.goals').config(['$stateProvider',
  function($stateProvider) {

    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    
    $stateProvider.state('goals-page', {
      url: '/goals-page',
      templateUrl: 'goals/views/goals-pages/index.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals-page.create',{
      url: '/create',
      templateUrl: 'goals/views/goals-pages/create.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals-page.update',{
      url: '/update/:pageId',
      templateUrl: 'goals/views/goals-pages/update.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });
  }
]);