'use strict';
angular.module('mean.goals').controller('PagesController', ['$scope', '$stateParams', '$location', 'Global', 'Pages',
  function($scope, $stateParams, $location, Global, Pages) {
    $scope.global = Global;

    $scope.create = function(isValid, data) {
      if (isValid) {
        var page = new Pages({
          year: data.year,
          name: data.name,
          overview: data.overview,
          video: data.video
        });

        page.$save(function(response) {
          $scope.msg = response;
          $location.path('/goals-page');
        });

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(page) {
      if (page) {
        page.$remove(function (response) {
          for (var i in $scope.pages) {
            if ($scope.pages[i] === page) {
              $scope.pages.splice(i, 1);
            }
          }
        });
      } else {
        $scope.page.$remove(function(response) {
          $location.path('/goals-page');
        });
      }
    };

    $scope.update = function(isValid, data) {
      if (isValid) {
        var page = data;
        if (!page.updated) {
          page.updated = [];
        }
        page.updated.push(new Date().getTime());

        page.$update(function() {
          $location.path('/goals-page');
        });
      }
    };

    $scope.find = function() {
      Pages.query(function(pages) {
        $scope.pages = pages;
      });
    };

    $scope.findOne = function() {
      Pages.get({
        pageId: $stateParams.pageId
      }, function(page) {
        $scope.page = page;
      });
    };
  }
]);
