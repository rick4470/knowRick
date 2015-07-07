/* global angular */
'use strict';
angular.module('mean.system').controller('BlogController', ['$scope', 'Global', 'BlogService',
  '$stateParams', '$sce',
  function ($scope, Global, BlogService, $stateParams, $sce) {
        $scope.global = Global;

        $scope.getBlogPosts = function () {
            $scope.loading = true;
            $scope.message = false;

            BlogService.getBlogData(function (blogData) {
                if (blogData.posts.length > 0) {
                    $scope.pagination = blogData.meta.pagination;
                    $scope.posts = blogData.posts;
                    $scope.getPost();
                    $scope.message = false;
                } else {
                    $scope.message = true;
                }
                $scope.loading = false;
            });
        };

        $scope.getBlogPosts();

        $scope.previousPage = function (prev) {
            if (prev === undefined) {
                $scope.previousPage = 'disabled';
            } else {
                $scope.previousPage = '';
            }
        };

        $scope.$on('$locationChangeSuccess', function (evt) {
            if ($stateParams.postId !== undefined) {
                $scope.getPost();
            }
        });
        $scope.contentLoaded = false;
        $scope.getPost = function () {
            $scope.contentLoaded = false;
            if ($stateParams.postId !== undefined) {
                $scope.posts.forEach(function (post, index) {
                    if (post.slug === $stateParams.postId) {
                        try {
                            post.html = $sce.trustAsHtml(post.html);
                            post.url = window.location.href;
                            $scope.contentLoaded = true;
                        } catch (err) {}
                        $scope.post = post;
                        $scope.loading = false;
                    }
                });
            }
        };

  }
]).directive('dirDisqus', ['$window', function ($window) {
    return {
        restrict: 'E',
        scope: {
            disqus_shortname: '@disqusShortname',
            disqus_identifier: '@disqusIdentifier',
            disqus_title: '@disqusTitle',
            disqus_url: '@disqusUrl',
            disqus_category_id: '@disqusCategoryId',
            disqus_disable_mobile: '@disqusDisableMobile',
            disqus_config_language: '@disqusConfigLanguage',
            disqus_remote_auth_s3: '@disqusRemoteAuthS3',
            disqus_api_key: '@disqusApiKey',
            readyToBind: '@'
        },
        template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>',
        link: function (scope) {

            // ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
            // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
            if (typeof scope.disqus_identifier === 'undefined' || typeof scope.disqus_url === 'undefined') {
                throw 'Please ensure that the `disqus-identifier` and `disqus-url` attributes are both set.';
            }

            scope.$watch('readyToBind', function (isReady) {

                // If the directive has been called without the 'ready-to-bind' attribute, we
                // set the default to "true" so that Disqus will be loaded straight away.
                if (!angular.isDefined(isReady)) {
                    isReady = 'true';
                }
                if (scope.$eval(isReady)) {
                    // put the config variables into separate global vars so that the Disqus script can see them
                    $window.disqus_shortname = scope.disqus_shortname;
                    $window.disqus_identifier = scope.disqus_identifier;
                    $window.disqus_title = scope.disqus_title;
                    $window.disqus_url = scope.disqus_url;
                    $window.disqus_category_id = scope.disqus_category_id;
                    $window.disqus_disable_mobile = scope.disqus_disable_mobile;
                    $window.disqus_config = function () {
                        this.language = scope.disqus_config_language;
                        this.page.remote_auth_s3 = scope.disqus_remote_auth_s3;
                        this.page.api_key = scope.disqus_api_key;

                    };
                    // get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                    if (!$window.DISQUS) {
                        var dsq = document.createElement('script');
                        dsq.type = 'text/javascript';
                        dsq.async = true;
                        dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    } else {
                        $window.DISQUS.reset({
                            reload: true,
                            config: function () {
                                this.page.identifier = scope.disqus_identifier;
                                this.page.url = scope.disqus_url;
                                this.page.title = scope.disqus_title;
                                this.language = scope.disqus_config_language;
                                this.page.remote_auth_s3 = scope.disqus_remote_auth_s3;
                                this.page.api_key = scope.disqus_api_key;
                            }
                        });
                    }
                }
            });
        }
    };
    }]);
