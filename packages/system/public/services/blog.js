'use strict';

angular.module('mean.system').service('BlogService', function($http) {
  delete $http.defaults.headers.common['X-Requested-With'];
  this.getBlogData = function(callBack) {
    $http({
      method: 'GET',
      url: '/posts'
    }).success(function(data){
      callBack(data);
    }).error(function(err){
      console.log(err);
    });
  };
});

    
