'use strict';

/* jshint -W098 */
angular.module('mean.goals').controller('CreateController', ['$scope', 'Global', 'Goals', '$modal', '$templateCache', '$http', 'SubGoals',
  function ($scope, Global, Goals, $modal, $templateCache, $http, SubGoals) {
        $scope.global = Global;
        $scope.flashActive = '';
        $scope.goals = [];
        $scope.subGoal = false;


        $scope.latestGoals = function () {
            Goals.query(function (data) {
                $scope.goals = data;
            });
        };

        $scope.latestGoals();

        $scope.addGoal = function () {
            $scope.subGoal = false;
            createGoal();
        };

        $scope.addSubGoal = function (id) {
            createGoal(id);
        };

        $scope.delete = function (index, subgoal) {
            if (subgoal !== undefined) {
                if (index > -1) {
                    SubGoals.get({
                        subGoalId: $scope.goals[index].subGoal[subgoal]._id
                    }, function (subGoal) {

                        subGoal.$remove(function (response) {
                            $scope.goals[index].subGoal.splice(subgoal, 1);

                            var idsArray = [];
                            for (var i = 0; i < $scope.goals[index].subGoal.length; i += 1) {
                                idsArray.push($scope.goals[index].subGoal[i]._id);
                            }
                            $scope.goals[index].subGoal = idsArray;
                            $scope.goals[index].goalTotal -= response.goalTotal;

                            $scope.goals[index].$update(function (response) {
                                $scope.goals[index] = response;
                            });

                        });
                    });
                }
            } else {
                if (index > -1) {
                    $scope.goals[index].$remove(function (response) {
                        $scope.goals.splice(index, 1);
                    });
                }
            }
        };


        $scope.edit = function (goal, subgoal) {
            if (subgoal !== undefined) {
                editGoal($scope.goals[goal], $scope.goals[goal].subGoal[subgoal]);
            } else {
                editGoal($scope.goals[goal]);
            }
        };

        $scope.today = function () {
            $scope.dt = new Date();
        };

        $scope.today();


        function editGoal(goal, subGoal) {

            var ModalInstanceCtrl = function ($scope, $modalInstance) {
                $scope.actionType = 'Update';

                if (subGoal !== undefined) {
                    $scope.subGoal = true;
                    SubGoals.get({
                        subGoalId: subGoal._id
                    }, function (subGoal) {
                        $scope.goal = subGoal;
                    });
                } else {
                    $scope.goal = goal;
                }

                $scope.ok = function (goal) {
                    $modalInstance.close(goal);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

            var template = $templateCache.get('goalTemplate.html');

            var modalInstance = $modal.open({
                template: template,
                controller: ModalInstanceCtrl,
                size: 'lg',
            });

            modalInstance.result.then(function (goal) {
                if (subGoal !== undefined) {
                    goal.$update(function (response) {
                        if (response._id !== undefined) {
                            $scope.latestGoals();
                        }
                    });
                } else {
                    var idsArray = [];
                    for (var i = 0; i < goal.subGoal.length; i += 1) {
                        idsArray.push(goal.subGoal[i]._id);
                    }
                    goal.subGoal = idsArray;

                    goal.$update(function (response) {
                        if (response._id !== undefined) {
                            $scope.latestGoals();
                        }
                    });
                }
                return true;
            }, function () {
                $scope.goal = null;
                return false;
            });
        }

        function createGoal(subgoal) {
            var ModalInstanceCtrl = function ($scope, $modalInstance) {
                $scope.actionType = 'Create';
                if (subgoal !== undefined) {
                    $scope.subGoal = true;
                }

                $scope.ok = function (goal) {
                    $modalInstance.close(goal);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

            var template = $templateCache.get('goalTemplate.html');

            var modalInstance = $modal.open({
                template: template,
                controller: ModalInstanceCtrl,
                size: 'lg',
            });

            modalInstance.result.then(function (goal) {
                $scope.goal = null;

                if (subgoal !== undefined) {
                    if ($scope.goals[subgoal].subGoal === undefined) {
                        $scope.goals[subgoal].subGoal = [];
                    }
                    var subGoalService = new SubGoals({
                        name: goal.name,
                        description: goal.description,
                        goalTotal: goal.goalTotal,
                        completeBy: goal.completeBy
                    });

                    subGoalService.$save(function (response) {

                        var idsArray = [];
                        for (var i = 0; i < $scope.goals[subgoal].subGoal.length; i += 1) {
                            idsArray.push($scope.goals[subgoal].subGoal[i]._id);
                        }
                        idsArray.push(response._id);
                        $scope.goals[subgoal].subGoal = idsArray;
                        $scope.goals[subgoal].goalTotal += response.goalTotal;

                        $scope.goals[subgoal].$update(function (response) {
                            $scope.goals[subgoal] = response;
                            if (response._id !== undefined) {
                                $scope.latestGoals();
                            }
                        });
                    });

                } else {
                    var goalService = new Goals({
                        name: goal.name,
                        description: goal.description,
                        completeBy: goal.completeBy
                    });
                    goalService.$save(function (response) {
                        $scope.goals.push(response);
                    });

                }
                return true;
            }, function () {
                $scope.goal = null;
                return false;
            });
        }
  }
]);
