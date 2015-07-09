'use strict';

angular.module('mean.system').controller(
    'FeedController', ['$scope', 'Goals', 'Feed', 'Global', function ($scope, Goals, Feed, Global) {
        $scope.global = Global;
        $scope.globalFeed = [];
        $scope.loggedIn = false;

        // Make sure that a users is logged in
        if ($scope.global.user.name === undefined) {
            $scope.global.user.name = 'Rick H';
        } else {
            $scope.loggedIn = true;
        }

        Goals.query(function (data) {
            $scope.goals = getListOfGoals(data);
            Feed.query(function (data) {
                $scope.globalFeed = getListOfPosts(data);
                $scope.service = data;
            });
        });

        $scope.showImage = false;
        $scope.uploadComplete = function (files) {
            $scope.imageLocation = files[0].src;
            $scope.showImage = true;
        };

        $scope.fileUpload = function () {
            setTimeout(function () {
                angular.element('#file_browse').trigger('click');
            }, 0);
        };


        $scope.showInput = function (type) {
            hideAllInputs();
            switch (type) {
                case 'location':
                    $scope.showLocationInput = true;
                    $scope.locationComplete = false;
                    break;
                case 'youtube':
                    $scope.showYoutubeInput = true;
                    break;
                case 'goals':
                    $scope.showGoalsInput = true;
                    break;
                default:
                    break;
            }
        };

        $scope.onBlur = function (type) {
            hideAllInputs();
            switch (type) {
                case 'location':
                    if ($scope.locationName.length > 0) {
                        $scope.locationComplete = true;
                    }
                    break;
                case 'youtube':
                    var start = $scope.youTubeURL.indexOf('v=');
                    if (start > 1) {
                        start = start + 2;
                        var code = $scope.youTubeURL.slice(start, $scope.youTubeURL.length);
                        $scope.validYouTubeURL = 'https://www.youtube.com/embed/' + code;
                        $scope.showVideo = true;
                    }
                    break;
                default:
                    break;
            }
        };

        $scope.selectedGoal = function (item) {
            hideAllInputs();
            $scope.goalID = item.id;
            $scope.showGoal = true;
            $scope.goal = item;
        };
        $scope.remove = function (post) {
            var removeItem;
            for (var item in $scope.service) {
                if ($scope.service[item]._id === post.id) {
                    removeItem = item;
                }
            }
            $scope.service[removeItem].$remove(function (response) {
                if (response !== undefined) {
                    for (var item in $scope.globalFeed) {
                        if ($scope.globalFeed[item].id === post.id) {
                            $scope.globalFeed.splice(item, 1);
                            break;
                        }
                    }
                }
            });


        };

        $scope.post = function () {

            $scope.upload = true;
            $scope.sending = true;

            var feedService = new Feed({
                status: $scope.status,
                goalId: $scope.goalID,
                image: $scope.imageLocation,
                youtube: $scope.validYouTubeURL,
                location: $scope.locationName
            });



            feedService.$save(function (response) {

                if (response !== undefined) {

                    $scope.status = undefined;
                    $scope.goalID = undefined;
                    $scope.imageLocation = undefined;
                    $scope.validYouTubeURL = undefined;
                    $scope.locationName = undefined;
                    $scope.youTubeURL = undefined;
                    $scope.imageLocation = undefined;
                    hideAllInputs();

                    var newPost = {
                        created: response.created,
                        status: response.status,
                        location: response.location,
                        youtube: response.youtube,
                        goalId: response.goalId,
                        image: response.image,
                        id: response._id
                    };
                    $scope.service.push(response);
                    var templateType = 0;
                    if (newPost.status !== undefined) {
                        templateType += 1;
                    }
                    if (newPost.image !== undefined) {
                        templateType += 1;
                    }
                    if (newPost.youtube !== undefined) {
                        templateType += 1;
                    }

                    switch (templateType) {
                        case 1:
                            newPost.template1 = true;
                            break;
                        case 2:
                            if (newPost.youtube !== undefined) {
                                newPost.template1 = true;
                            } else {
                                newPost.template2 = true;
                            }
                            break;
                        case 3:
                            newPost.template2 = true;
                            break;
                        default:
                            break;
                    }

                    $scope.globalFeed.push(newPost);
                    $scope.sent = true;
                    $scope.sending = false;

                    window.setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.upload = false;
                        });
                    }, 1000);
                }
            });

        };

        function getListOfPosts(data) {
            var posts = [];
            for (var post in data) {

                var validPost = {
                    created: data[post].created,
                    status: data[post].status,
                    location: data[post].location,
                    youtube: data[post].youtube,
                    id: data[post]._id
                };

                if (data[post].goalId !== undefined) {
                    for (var goal in $scope.goals) {
                        if ($scope.goals[goal].id === data[post].goalId) {
                            validPost.goal = $scope.goals[goal].name;
                        }
                    }
                }
                if (!isNaN(post)) {
                    var templateType = 0;
                    if (data[post].status !== undefined) {
                        templateType += 1;
                    }
                    if (data[post].image !== undefined) {
                        templateType += 1;
                        validPost.image = data[post].image;
                    }
                    if (data[post].youtube !== undefined) {
                        templateType += 1;
                        validPost.image = data[post].image;
                    }


                    switch (templateType) {
                        case 1:
                            validPost.template1 = true;
                            break;
                        case 2:
                            if (data[post].youtube !== undefined) {
                                validPost.template1 = true;
                            } else {
                                validPost.template2 = true;
                            }
                            break;
                        case 3:
                            validPost.template2 = true;
                            break;
                        default:
                            break;
                    }
                    posts.push(validPost);
                }
            }
            return posts;
        }

        function getListOfGoals(data) {
            var goals = [];
            for (var goal in data) {
                if (!isNaN(goal)) {
                    var goalSubmission = {
                        id: data[goal]._id,
                        name: data[goal].name,
                        date: data[goal].completeBy
                    };
                    goals.push(goalSubmission);

                    for (var subGoal in data[goal].subGoal) {
                        goalSubmission = {
                            id: data[goal].subGoal[subGoal]._id,
                            name: data[goal].subGoal[subGoal].name,
                            date: data[goal].subGoal[subGoal].completeBy
                        };
                        goals.push(goalSubmission);
                    }
                }
            }
            return goals;
        }

        function hideAllInputs() {
            $scope.showLocationInput = false;
            $scope.showYoutubeInput = false;
            $scope.showGoalsInput = false;
        }

            }]).filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
