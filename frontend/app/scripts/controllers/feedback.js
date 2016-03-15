'use strict';

angular.module('maXTouchStudioPortal')
    .controller('FeedbackCtrl', function ($scope, alert, $state, $http, API_URL, Pagination) {
        $scope.contentLoaded = false;
        $scope.pagination = Pagination.getNew(10);

        $http.get(API_URL + 'authenticatesurvey').success(function (token) {
            $http.get(API_URL + 'feedback', {
                params: {
                    token: token
                }
            }).then(function (res) {
                $scope.feedback = [];

                var obj = [];
                res.data.forEach(function (receivedData) {
                    $scope.feedback.push({
                        _id: receivedData._id,
                        name: receivedData.name.toString(),
                        email: receivedData.emailId.toString(),
                        comments: receivedData.comments.toString(),
                        rating: receivedData.rating.toString()
                    });
                });
                $scope.pagination.numPages = Math.ceil($scope.feedback.length / $scope.pagination.perPage);
                //  $scope.totalDisplayed = 5;
                //  $scope.loadMore = function (limit) {
                //       $scope.totalDisplayed += limit;
                //   };
                $scope.contentLoaded = true;
            }, function (err) {
                console.log(err);
            })
        })
    });
