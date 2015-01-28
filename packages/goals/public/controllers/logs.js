'use strict';

/* jshint -W098 */
angular.module('mean.goals').controller('LogController', ['$scope', 'Global', 'Goals','$modal', '$templateCache','$http', 'SubGoals',
  function($scope, Global, Goals, $modal, $templateCache, $http, SubGoals) {
    $scope.global = Global;
    $scope.floor = 0;
    $scope.step = 1;
    $scope.precision = 0;
    $scope.sliderWidth = '400px';
    $scope.previousValues = [];
    $scope.oneAtATime = true;
    

    $scope.latestGoals = function() {
      Goals.query(function(data) {
        $scope.goals = data;
        for (var i = 0; i < $scope.goals.length; i += 1) {
          for (var index = 0; index < $scope.goals[i].subGoal.length; index += 1) {
            $scope.previousValues.push({'goalID': $scope.goals[i].subGoal[index]._id, 'value': $scope.goals[i].subGoal[index].goalTotalCompleted});
          }
        }
      });
    };

    $scope.setValue = function(goal, subgoal) {
      logProgress(goal, subgoal);
    };

    $scope.change = function(goal, value, index) {

      if ($scope.previousValues[index] === undefined) {
        for (var i = 0; i < index; i += 1){
          if ($scope.previousValues[i] === undefined) {
            $scope.previousValues.push({'goalID': null, 'value': null});
          }
        }
      }
      var previousValue = 0;
      if ($scope.previousValues[index] !== undefined) {
        previousValue = $scope.previousValues[index].value;
      }else{
        $scope.previousValues.push({'goalID': goal._id, 'value': previousValue});
      }

      var diff = null;
      if (previousValue < value) {
        diff = value - previousValue; 
        $scope.previousValues[index].value = value;
        goal.goalTotalCompleted = goal.goalTotalCompleted + diff;
      }else{
        diff = previousValue - value;
        $scope.previousValues[index].value = value;
        goal.goalTotalCompleted = goal.goalTotalCompleted - diff;
      }
    };

    function logProgress (goal, subgoal) {

      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.floor = 0;
        $scope.step = 1;
        $scope.precision = 0;
        $scope.sliderWidth = '400px';
        $scope.actionType = 'Create';
        $scope.goal = goal;
        $scope.subgoal = subgoal;
        
        $scope.ok = function(note) {
          $modalInstance.close(note);
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      var template = $templateCache.get('progressTemplate.html');
      
      var modalInstance = $modal.open({
        template: template,
        controller: ModalInstanceCtrl,
        size: 'lg',
      });

      modalInstance.result.then(function(note){
        Goals.get({
          goalId: goal._id
        }, function(data) {
          $scope.goalResource = data;
          $scope.goalResource.goalTotalCompleted = goal.goalTotalCompleted;
          $scope.goalResource.$update(function(response){});
        });

        var progress = {
          note: note,
          goalTotal: subgoal.goalTotalCompleted,
        };

        SubGoals.get({
          subGoalId: subgoal._id
        }, function(data) {
          $scope.subGoalResource = data;
          $scope.subGoalResource.goalTotalCompleted = subgoal.goalTotalCompleted;
          var prgoressArray = [];
          for (var i = 0; i < $scope.subGoalResource.progress.length; i += 1) {
            prgoressArray.push($scope.subGoalResource.progress[i]._id);
          }
          $scope.subGoalResource.progress = prgoressArray;
          $scope.subGoalResource.newProgress = progress;
          $scope.subGoalResource.$update(function(response){});
        });

        return true;
      }, function() {
        return false;
      });
    }
  }
]);
