'use strict';

/* jshint -W098 */
angular.module('mean.goals').controller('CreateController', ['$scope', 'Global', 'Goals','$modal', '$templateCache','$http', 'SubGoals',
  function($scope, Global, Goals, $modal, $templateCache, $http, SubGoals) {
    $scope.global = Global;
    $scope.flashActive = '';
    $scope.goals = [];
    $scope.subGoal = false;

    $scope.latestGoals = function() {
      Goals.query(function(data) {
        $scope.goals = data;
        $scope.gotdata = data;
      });
    };

    $scope.latestGoals();

    $scope.addGoal = function() {
      createGoal();
    };

    $scope.addSubGoal = function(id) {
      createGoal(id);
    };

    $scope.delete = function(index, subgoal){
      if (subgoal !== undefined) {
        if (index > -1) {
          $scope.goals[index].subgoal.splice(subgoal, 1);
        }
      }else{
        if (index > -1) {
          $scope.goals[index].$remove(function(response) {
            $scope.goals.splice(index, 1);
          });
        }
      }
    };


    $scope.edit = function(index, subgoal){
      if (subgoal !== undefined) {
        editGoal($scope.goals[index].subgoal[subgoal], true);
      }else{
        editGoal($scope.goals[index]);
      }
    };


    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.today();


    function editGoal (goal, subGoal) {

      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.actionType = 'Update';
        $scope.goal = goal;
        if (subGoal) $scope.subGoal = true;

        $scope.ok = function(goal) {
          $modalInstance.close(goal);
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      var template = $templateCache.get('goalTemplate.html');
      
      var modalInstance = $modal.open({
        template: template,
        controller: ModalInstanceCtrl,
        size: 'lg',
      });

      modalInstance.result.then(function(goal){
        goal.$update(function(response){
          $scope.goal = null;    
        });
        return true;
      }, function() {
        $scope.goal = null;
        return false;
      });
    }

    function createGoal (subgoal) {
      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.actionType = 'Create';
        if (subgoal !== undefined){
          $scope.subGoal = true;
        }

        $scope.ok = function(goal) {
          $modalInstance.close(goal);
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      var template = $templateCache.get('goalTemplate.html');
      
      var modalInstance = $modal.open({
        template: template,
        controller: ModalInstanceCtrl,
        size: 'lg',
      });

      modalInstance.result.then(function(goal){
        $scope.goal = null;

        if (subgoal !== undefined) {
          if ($scope.goals[subgoal].subGoal === undefined) {
            $scope.goals[subgoal].subGoal = [];
          }
          var subGoalService = new SubGoals({
            name: goal.name,
            description: goal.description,
            goalTotal: goal.total,
            completeBy: goal.completeBy
          });

          subGoalService.$save(function(response) {
            $scope.gotdata = response;
            $scope.goals[subgoal].subGoal.push({'name': goal.name, 'description': goal.description, 'goalTotal': goal.total,'completeBy': goal.completeBy});

            console.log($scope.goals[subgoal]);
            /*
            $scope.goals[subgoal].$update(function(response){
              $scope.gotdata = response;
            });
            */

          });
          
        }else{
          var goalService = new Goals({
            name: goal.name,
            description: goal.description,
            completeBy: goal.completeBy
          });
          goalService.$save(function(response) {
            $scope.goals.push({'name': goal.name, 'description': goal.description, 'completeBy': goal.completeBy});
          });
        }
        return true;
      }, function() {
        $scope.goal = null;
        return false;
      });
    }
  }
]);
