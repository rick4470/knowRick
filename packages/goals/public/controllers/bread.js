'use strict';

/* jshint -W098 */
angular.module('mean.goals').controller('breadController', ['$scope', 'Global', 'Goals',
  function ($scope, Global, Goals) {
        $scope.indexInit = function () {
            $scope.breadCrumbs = [{
                'location': 'goals',
                'name': 'Goals'
      }];
        };

        $scope.createInit = function () {
            $scope.breadCrumbs = [{
                'location': 'goals',
                'name': 'Goals'
      }, {
                'location': 'goals.create',
                'name': 'Manage Goals'
      }];
        };

        $scope.viewInit = function () {
            $scope.breadCrumbs = [{
                'location': 'goals',
                'name': 'Goals'
      }, {
                'location': 'goals.view',
                'name': 'All Goals'
      }];
        };

        $scope.todayInit = function () {
            $scope.breadCrumbs = [{
                'location': 'goals',
                'name': 'Goals'
      }, {
                'location': 'goals.today',
                'name': 'Today\'s Goals'
      }];
        };

        $scope.yearInit = function () {
            $scope.breadCrumbs = [{
                'location': 'goals',
                'name': 'Goals'
      }, {
                'location': 'goals.year',
                'name': 'Manage Year\'s Pages'
      }];
        };

        $scope.createPageInit = function () {
            $scope.breadCrumbs = [{
                'location': 'goals',
                'name': 'Goals'
      }, {
                'location': 'goals.year',
                'name': 'Manage Year\'s Pages'
      }, {
                'location': 'goals.create-page',
                'name': 'Create a Page'
      }];
        };

        $scope.updatePageInit = function () {
            $scope.breadCrumbs = [{
                'location': 'goals',
                'name': 'Goals'
      }, {
                'location': 'goals.year',
                'name': 'Manage Year\'s Pages'
      }, {
                'location': 'goals.update-page',
                'name': 'Updating a page'
      }];
        };

  }
]);
