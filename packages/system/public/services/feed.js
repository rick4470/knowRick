'use strict';
angular.module('mean.system').factory('Feed', ['$resource',
  function ($resource) {
        return $resource('feed/:feedId', {
            feedId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
  }
]);
