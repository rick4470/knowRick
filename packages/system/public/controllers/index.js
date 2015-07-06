'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$http', 'Goals',
  function ($scope, Global, $http, Goals) {
        $scope.oneAtATime = true;
        $scope.open = false;
        $scope.global = Global;

        $scope.pageInit = function () {
            $http.get('/latest-page').success(function (data) {
                $scope.page = data;
            });
            Goals.query(function (data) {
                $scope.goals = data;
                for (var goal in $scope.goals) {
                    if (!isNaN(goal)) {
                        $scope.goals[goal].isOpen = false;
                        $scope.goals[goal].chevron = 'glyphicon-chevron-right';
                    }
                }
                window.setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.goals[0].isOpen = true;
                        $scope.goals[0].chevron = 'glyphicon-chevron-down';
                    });
                }, 1000);
            });
        };

        $scope.chevron = function (goal) {
            switch (goal.chevron) {
                case 'glyphicon-chevron-down':
                    goal.chevron = 'glyphicon-chevron-right';
                    break;
                case 'glyphicon-chevron-right':
                    goal.chevron = 'glyphicon-chevron-down';
                    break;
            }
        };
}]);
