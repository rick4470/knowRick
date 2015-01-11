'use strict';
angular.module('mean.system').controller('BlogController', ['$scope', 'Global','BlogService',
  '$stateParams', '$sce',
  function($scope, Global, BlogService, $stateParams, $sce) {
    $scope.global = Global;

    $scope.getBlogPosts = function(){
      $scope.loading = true;
      $scope.message = false;

      BlogService.getBlogData(function(blogData) {
        if (blogData.posts.length > 0) {
          $scope.pagination = blogData.meta.pagination;
          $scope.posts = blogData.posts;
          $scope.getPost();
          $scope.message = false;
        }else{
          $scope.message = true;
        }
        $scope.loading = false;
      });
    };

    $scope.getBlogPosts();

    $scope.previousPage = function(prev) {
      if (prev === undefined) {
        $scope.previousPage = 'disabled';
      }else{
        $scope.previousPage = '';
      }
    };

    $scope.$on('$locationChangeSuccess', function(evt) {
      if ($stateParams.postId !== undefined) {
        $scope.getPost();
      }
    });

    $scope.getPost = function(){
      if ($stateParams.postId !== undefined) {
        $scope.posts.forEach(function(post, index){
          if (post.uuid === $stateParams.postId) {
            try {post.html = $sce.trustAsHtml(post.html);}catch(err) {}
            $scope.post = post;
            $scope.loading = false;
          }
        });
      }
    };

  }
]);
