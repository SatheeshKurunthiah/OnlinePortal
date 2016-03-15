'use strict';

angular.module('maXTouchStudioPortal')
    .controller('LoginCtrl', function ($scope, alert, $state, $http, $auth) {
        console.log('Inside Login controller');
        $scope.submit = function () {
            console.log('Calling backend url for login' + $scope.username +' '+ $scope.password);
            $auth.login({
                    email: $scope.username,
                    password: $scope.password
                })
                .then(function (res) {
                    var message = 'Thanks for coming back ' + res.data.user.email + '!';

                    if (!res.data.user.active)
                        message = 'Just a reminder, please activate your account soon..!!)';
                    alert('success', 'Login Successfull', 'Welcome !!' + message);
                    $state.go('main');
                })
                .catch(handleError);
        }

        function handleError(err) {
            alert('warning', 'Login Failed', err.message);
        }

    });
