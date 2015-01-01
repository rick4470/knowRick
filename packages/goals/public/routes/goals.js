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
    
    $stateProvider.state('goals', {
      url: '/goals',
      templateUrl: 'goals/views/index.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals.create',{
      url: '/create',
      templateUrl: 'goals/views/create.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals.update', {
      url: '/update',
      templateUrl: 'goals/views/update.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals.today', {
      url: '/today',
      templateUrl: 'goals/views/today.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals.year', {
      url: '/year',
      templateUrl: 'goals/views/year.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals.create-page',{
      url: '/create-page',
      templateUrl: 'goals/views/create-page.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals.update-page',{
      url: '/update-page/:pageId',
      templateUrl: 'goals/views/update-page.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });
  }
]);