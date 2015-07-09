'use strict';

angular.module('mean.upload').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('Mean upload help page', {
            url: '/meanupload/help',
            templateUrl: 'upload/views/index.html'
        });
    }
]);
