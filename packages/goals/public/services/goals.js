'use strict';

angular.module('mean.goals').factory('Goals', ['$resource',
  function($resource) {
    return $resource('goal/:goalId', {
      goalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);