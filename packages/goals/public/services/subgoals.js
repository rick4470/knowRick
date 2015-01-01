'use strict';

angular.module('mean.goals').factory('SubGoals', ['$resource',
  function($resource) {
    return $resource('sub-goal/:goalId', {
      goalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);