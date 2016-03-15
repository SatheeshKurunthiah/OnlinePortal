'use strict';

angular.module('maXTouchStudioPortal').config(function ($urlRouterProvider, $stateProvider, $httpProvider, API_URL, $authProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: '/views/main.html',
            // controller: 'LoginCtrl'
        })
        .state('statistics', {
            url: '/statistics',
            templateUrl: '/views/statistics.html'
        })
        .state('sharefile', {
            url: '/sharefile',
            templateUrl: '/views/sharefile.html',
            controller: 'shareFileCtrl'
        })
        .state('feedback', {
            url: '/feedback',
            templateUrl: '/views/feedback.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: '/views/about.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: '/views/contact.html'
        });

    $authProvider.loginUrl = API_URL + 'login/';
})

.constant('API_URL', 'http://localhost:3000/')
