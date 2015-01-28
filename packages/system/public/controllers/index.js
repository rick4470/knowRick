'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$http','Goals',
  function($scope, Global, $http, Goals) {
    $scope.oneAtATime = true;
    $scope.open = false;
    $scope.global = Global;

    $scope.pageInit = function () {
      $http.get('/latest-page').success(function(data) {
        $scope.page = data;
      });
      Goals.query(function(data) {
        $scope.goals = data;
      });
    };

    $scope.viewSubGoal = function(goal){
      $scope.open = true;
      if (goal.subGoal.length > 0) {
        $scope.subGoals = goal.subGoal;
        $scope.goalName = goal.name;
        $scope.completeBy = goal.completeBy;
      }
    };
  }
]);
