'use strict';

angular.module('mean.goals').config(['$stateProvider',
  function ($stateProvider) {

        var checkLoggedin = function ($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
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
        }).state('goals.create', {
            url: '/create',
            templateUrl: 'goals/views/goals/create.html',
            resolve: {
                loggedin: checkLoggedin
            }
        }).state('goals.log', {
            url: '/log',
            templateUrl: 'goals/views/goals/log-goals.html',
            resolve: {
                loggedin: checkLoggedin
            }
        });
  }
]);
