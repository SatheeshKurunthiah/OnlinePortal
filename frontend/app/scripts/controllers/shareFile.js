'use strict';

angular.module('maXTouchStudioPortal')
    .controller('shareFileCtrl', function ($scope, alert, $state, $http, API_URL) {
        $http.post(API_URL + 'auth/shareFile').success(function (data, status) {
            console.log("Data: " + data);
            console.log("Status: " + status);
        })
    });
