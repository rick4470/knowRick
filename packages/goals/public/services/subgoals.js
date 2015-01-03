'use strict';

angular.module('mean.goals').factory('SubGoals', ['$resource',
  function($resource) {
    return $resource('sub-goal/:subGoalId', {
      subGoalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);