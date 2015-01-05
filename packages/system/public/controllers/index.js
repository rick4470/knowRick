'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$http','Goals',
  function($scope, Global, $http, Goals) {
    $scope.global = Global;
    $scope.isCollapsed = true;
    $scope.chevron = 'fa-chevron-right';

    $scope.pageInit = function () {
      $http.get('/latest-page').success(function(data) {
        $scope.page = data;
      });
      Goals.query(function(data) {
        $scope.goals = data;
      });
    };

    $scope.viewSubGoal = function(goal){
      $scope.isCollapsed = true;
      if (goal.subGoal.length > 0) {
        $scope.chevron = 'fa-chevron-down';
        $scope.subGoals = goal.subGoal;
        $scope.goalName = goal.name;
        $scope.completeBy = goal.completeBy;
        $scope.isCollapsed = false;
      }
    };

    $scope.closeChevron = function(){
      $scope.chevron = 'fa-chevron-right';
    };
  }
]);
