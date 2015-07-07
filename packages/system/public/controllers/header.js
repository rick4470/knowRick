'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', '$http', '$location',
  function ($scope, $rootScope, Global, $http, $location) {
        $scope.global = Global;

        $scope.setSideBar = function () {
            var path = $location.path();
            var pages = [{
                'id': 0,
                'active': 'active',
                'location': 'root',
                'icon': 'fa-check',
                'name': 'Goals'
            }, {
                'id': 1,
                'active': '',
                'location': 'root.feed',
                'icon': 'fa-list-ul',
                'name': 'Activity Feed'

            }, {
                'id': 2,
                'active': '',
                'location': 'root.about',
                'icon': 'fa-book',
                'name': 'About'
            }, {
                'id': 3,
                'active': '',
                'location': 'root.blog',
                'icon': 'fa-pencil',
                'name': 'Blog'
            }, {
                'id': 4,
                'active': '',
                'location': 'root.contact',
                'icon': 'fa-envelope-o',
                'name': 'Contact'
            }];

            for (var i = 0; i < pages.length; i += 1) {
                path = 'root.' + path.replace('/', '');
                if (pages[i].location === path) {
                    pages[i].active = 'active';
                } else {
                    if (path === pages[i].location + '.') {
                        pages[i].active = 'active';
                    } else {
                        if (pages[i].active === 'active') {
                            pages[i].active = '';
                        } else {
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

        $scope.pagesInit = function () {
            $http.get('/pages').success(function (data) {
                $scope.goals = data;
            });
        };

        $scope.updateTab = function (pageId) {
            angular.forEach($scope.pages, function (page) {
                if (page.active === 'active') {
                    page.active = '';
                }
            });
            $scope.pages[pageId].active = 'active';
        };

        var goals = [{
            'author': 'Michael Jordan',
            'quote': 'The game has its ups and downs, but you can never lose focus of your individual goals and you can\'t let yourself be beat because of lack of effort'
      }, {
            'author': 'Tony Robbins',
            'quote': 'Setting goals is the first step in turning the invisible into the visible'
      }, {
            'author': 'Les Brown',
            'quote': 'If you set goals and go after them with all the determination you can muster, your gifts will take you places that will amaze you'
      }, {
            'author': 'Stephen Covey',
            'quote': 'Stop setting goals. Goals are pure fantasy unless you have a specific plan to achieve them'
      }, {
            'author': 'Nolan Bushnell',
            'quote': 'The critical ingredient is getting off your butt and doing something. It’s as simple as that. A lot of people have ideas, but there are few who decide to do something about them now. Not tomorrow. Not next week. But today. The true entrepreneur is a doer, not a dreamer.'
      }, {
            'author': 'Yoda, Jedi Master',
            'quote': 'Do. Or do not. There is no try.'
      }, {
            'author': 'Catherine Cook',
            'quote': 'To any entrepreneur: if you want to do it, do it now. If you don’t, you’re going to regret it.'
      }, {
            'author': 'Scott Belsky',
            'quote': 'It’s not about ideas. It’s about making ideas happen.'
      }, {
            'author': 'Michael Jordan',
            'quote': 'I\’ve missed more than 9,000 shots in my career. I\’ve lost almost 300 games. 26 times I\’ve been trusted to take the game\'s winning shot and missed. I\’ve failed over and over and over again in my life and that\'s why I succeed.'
      }, {
            'author': 'Jason Fried',
            'quote': 'There\’s nothing wrong with staying small. You can do big things with a small team.'
      }, {
            'author': 'Guy Kawasaki',
            'quote': 'Ideas are easy. Implementation is hard.'
      }, {
            'author': 'Mark Zuckerberg',
            'quote': 'If you just work on stuff that you like and you\’re passionate about, you don\’t have to have a master plan with how things will play out.'
      }, {
            'author': 'Chinese proverb',
            'quote': 'The best time to plant a tree was 20 years ago. The second best time is now.'
      }, {
            'author': 'Winston Churchill',
            'quote': 'Never give in–never, never, never, never, in nothing great or small, large or petty, never give in except to convictions of honour and good sense. Never yield to force; never yield to the apparently overwhelming might of the enemy.'
      }, {
            'author': 'Phil Libin',
            'quote': 'There\’s lots of bad reasons to start a company. But there\’s only one good, legitimate reason, and I think you know what it is: it\’s to change the world.'
      }, {
            'author': 'Marc Benioff',
            'quote': 'The secret to successful hiring is this: look for the people who want to change the world.'
      }, {
            'author': 'Vince Lombardi',
            'quote': 'The price of success is hard work, dedication to the job at hand, and the determination that whether we win or lose, we have applied the best of ourselves to the task at hand.'
      }, {
            'author': 'Henry Ford,',
            'quote': 'When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.'
      }, {
            'author': 'Ray Kroc',
            'quote': 'If you\’re not a risk taker, you should get the hell out of business.'
      }, {
            'author': 'Donald Trump',
            'quote': 'Watch, listen, and learn. You can\’t know it all yourself. Anyone who thinks they do is destined for mediocrity.'
      }, {
            'author': 'Larry Page',
            'quote': 'Always deliver more than expected'
      }, {
            'author': 'Mark Twain',
            'quote': 'Twenty years from now, you will be more disappointed by the things that you didn\'t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. Explore, Dream, Discover.'
      }, {
            'author': 'Steve Case',
            'quote': 'You shouldn\’t focus on why you can\’t do something, which is what most people do. You should focus on why perhaps you can, and be one of the exceptions.'
      }, {
            'author': 'Albert Einstein',
            'quote': 'A person who never made a mistake never tried anything new.'
      }, {
            'author': 'Howard Schultz',
            'quote': 'Risk more than others think is safe. Dream more than others think is practical.'
      }, {
            'author': 'Steve Jobs',
            'quote': 'I\’m convinced that about half of what separates the successful entrepreneurs from the non-successful ones is pure perseverance.'
      }, {
            'author': 'Anthony Volodkin',
            'quote': 'Be undeniably good. No marketing effort or social media buzzword can be a substitute for that.'
      }, {
            'author': 'Walt Disney',
            'quote': 'The way to get started is to quit talking and begin doing.'
      }, {
            'author': 'Wayne Gretzky,',
            'quote': 'You miss 100 percent of the shots you don\'t take.'
      }, {
            'author': 'Richard Branson',
            'quote': 'Do not be embarrassed by your failures, learn from them and start again.'
      }, {
            'author': 'Richard Harroch',
            'quote': 'It\’s almost always harder to raise capital than you thought it would be, and it always takes longer. So plan for that.'
      }, {
            'author': 'Sanjeev Saxena',
            'quote': 'If you don\'t know what to do with your life, do something that saves lives. The world is full of of people in need, be the part of their life that fills that need.'
      }, {
            'author': 'Confucius',
            'quote': 'It does not matter how slowly you go as long as you do not stop.'
      }, {
            'author': 'Gary Vaynerchuk',
            'quote': 'I hate how many people think, “glass half-empty” when their glass is really four-fifths full. I\’m grateful when I have one drop in the glass because I know exactly what to do with it.'
      }, {
            'author': 'Babe Ruth',
            'quote': 'It\'s hard to beat a person who never gives up.'
      }, {
            'author': 'Timothy Ferriss',
            'quote': 'For all of the most important things, the timing always sucks. Waiting for a good time to quit your job? The stars will never align and the traffic lights of life will never all be green at the same time. The universe doesn\'t conspire against you, but it doesn\'t go out of its way to line up Someday" is a disease that will take your dreams to the grave with you. Pro and con lists are just as bad. If it\'s important to you and you want to do it "eventually," just do it and correct course along the way.'
      }, {
            'author': 'Tom Kelley',
            'quote': 'Fail often so you can succeed sooner.'
      }, {
            'author': 'Sergey Brin',
            'quote': 'We are currently not planning on conquering the world.'
      }, {
            'author': 'Biz Stone',
            'quote': 'Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.'
      }, {
            'author': 'Beverly Sills',
            'quote': 'You may be disappointed if you fail, but you are doomed if you don\'t try.'
      }, {
            'author': 'Malcolm Forbes',
            'quote': 'When you cease to dream you cease to live'
      }, {
            'author': 'Noah Everett',
            'quote': 'Don\’t worry about funding if you don\’t need it. Today it\’s cheaper to start a business than ever.'
      }, {
            'author': 'Martin Luther King, Jr',
            'quote': 'If you can\'t fly then run, if you can\'t run then walk, if you can\'t walk then crawl, but whatever you do you have to keep moving forward.'
      }, {
            'author': 'Bill Gates',
            'quote': 'Your most unhappy customers are your greatest source of learning.'
      }, {
            'author': 'Thomas Edison',
            'quote': 'I have not failed. I\’ve just found 10,000 ways that won\’t work.'
      }, {
            'author': 'Peter Drucker',
            'quote': 'Entrepreneurship is neither a science nor an art. It is a practice.'
      }, {
            'author': 'David Ogilvy',
            'quote': 'In the modern world of business, it is useless to be a creative, original thinker unless you can also sell what you create.'
      }, {
            'author': 'Mark Cuban',
            'quote': 'It doesn\’t matter how many times you fail. It doesn\’t matter how many times you almost get it right. No one is going to know or care about your failures, and neither should you. All you have to do is learn from them and those around you because all that matters in business is that you get it right once. Then everyone can tell you how lucky you are.'
      }, {
            'author': 'General George Patton',
            'quote': 'Success is how high you bounce after you hit bottom.'
      }, {
            'author': 'Reid Hoffman',
            'quote': 'If you\’re not embarrassed by the first version of your product, you\’ve launched too late.'
      }, {
            'author': 'Zig Ziglar',
            'quote': 'Positive thinking will let you do everything better than negative thinking will.'
      }, {
            'author': 'Paul Rand,',
            'quote': 'Don\’t try to be original, just try to be good.'
      }, {
            'author': 'Jay Z',
            'quote': 'I\’m not afraid of dying, I\’m afraid of not trying'
      }, {
            'author': 'Dr. Napoleon Hill',
            'quote': 'Whatever the mind can conceive and believe, the mind can achieve'
      }];

        var randomNumber = Math.floor(Math.random() * goals.length);
        $scope.author = goals[randomNumber].author;
        $scope.quote = goals[randomNumber].quote;

        $scope.date = new Date();

  }
]);
