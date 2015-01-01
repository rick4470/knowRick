'use strict';

angular.module('mean.goals').factory('Pages', ['$resource',
  function($resource) {
    return $resource('pages/:pageId', {
      pageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);