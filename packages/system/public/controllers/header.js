'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', '$http', '$location',
  function($scope, $rootScope, Global, $http, $location) {
    $scope.global = Global;

    $scope.setSideBar = function() {
      var path = $location.path();
      var pages = [
        {
          'id': 0,
          'active': 'active',
          'location': 'root',
          'icon': 'fa-check',
          'name': 'Goals'
        },{
          'id': 1,
          'active': '',
          'location': 'root.about',
          'icon': 'fa-book',
          'name': 'About'
        },{
          'id': 2,
          'active': '',
          'location': 'root.blog',
          'icon': 'fa-pencil',
          'name': 'Blog'
        },{
          'id': 3,
          'active': '',
          'location': 'root.contact',
          'icon': 'fa-envelope-o',
          'name': 'Contact'
        }
      ];
      
      for (var i = 0; i < pages.length; i += 1) {
        path = 'root.' + path.replace('/', '');
        if (pages[i].location === path) {
          pages[i].active = 'active';
        }else{
          if (path === pages[i].location + '.') {
            pages[i].active = 'active';
          }else{
            if (pages[i].active === 'active') {
              pages[i].active = '';
            }else{
              if (path.indexOf(pages[i].location) > -1) {
                pages[i].active = 'active';
              }
            }
          }
        }
        path = path.replace('root.', '');
      }
      $scope.pages = pages;
    };
    $scope.setSideBar();

    var years = [
      {
        'year': 2014
      },{
        'year': 2015
      },
      ,{
        'year': 2016
      },
    ];
    $scope.years = years;

    $scope.pagesInit = function () {
      $http.get('/pages').success(function(data) {
        $scope.goals = data;
      });
    };

    $scope.updateTab = function(pageId){
      angular.forEach($scope.pages, function(page) {
        if (page.active === 'active') {
          page.active = '';
        }
      });
      $scope.pages[pageId].active = 'active';
    };

    var goals = [
      {
        'author': 'Michael Jordan',
        'quote': 'The game has its ups and downs, but you can never lose focus of your individual goals and you can\'t let yourself be beat because of lack of effort'
      },{
        'author': 'Tony Robbins',
        'quote': 'Setting goals is the first step in turning the invisible into the visible'
      },{
        'author': 'Les Brown',
        'quote': 'If you set goals and go after them with all the determination you can muster, your gifts will take you places that will amaze you'
      },{
        'author': 'Stephen Covey',
        'quote': 'Stop setting goals. Goals are pure fantasy unless you have a specific plan to achieve them'
      }
    ];

    var randomNumber = Math.floor(Math.random() * goals.length);
    $scope.author = goals[randomNumber].author;
    $scope.quote = goals[randomNumber].quote;

    $scope.date = new Date();

  }
]);
