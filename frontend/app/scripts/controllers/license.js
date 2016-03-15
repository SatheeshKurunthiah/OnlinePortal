'use strict';

angular.module('maXTouchStudioPortal')
    .controller('LicenseCountCtrl', function ($scope, alert, $state, $http, API_URL, Pagination) {
        $scope.contentLoaded = false;
        $scope.chartType = false;
        $scope.pagination = Pagination.getNew(10);
        $scope.showChart = true;
        var chartDataReceived = [];

        var drawChart = function (data) {
            $.getScript('http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js', function () {
                $.getScript('http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.0/morris.min.js', function () {
                    Morris.Bar({
                        element: 'bar-example',
                        data: data,
                        xkey: 'Company',
                        ykeys: ['RegisteredUser'],
                        labels: ['Percentage', 'Registered User'],
                        resize: true,
                        gridEnabled: true,
                        gridTextColor: '#000',
                        gridTextWeight: 'bold',
                        gridTextSize: 10,
                        barColors: ["#0B62A4"],
                        barGap: 3,
                        barSizeRatio: 0.35,
                        hoverCallback: function (index, options, content) {
                            var data = options.data[index];
                            $(".morris-hover").html('<div><h4 class="inset">' +
                                data.Company + ' : ' + data.Percentage + '%' + '</h4></div>');
                        }
                    });
                });
            });
        }
        $http.get(API_URL + 'license')
            .success(function (usersCount) {
                $scope.data = [];
                $scope.statistics = [];

               // $scope.totalDisplayed = 10;

              //  $scope.loadMore = function (limit) {
               //     $scope.totalDisplayed += limit;
              //  };
                $.getScript('http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js', function () {
                    $.getScript('http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.0/morris.min.js', function () {


                        Morris.Donut({
                            element: 'donut-example',
                            data: [
                                {
                                    label: "Atmel Users",
                                    value: usersCount[0].atmelUser
                            },
                                {
                                    label: "Non Atmel Users",
                                    value: usersCount[0].nonAtmelUser
                            },
        ]
                        });

                    });
                });

                var list = usersCount[0].sortedArray;
                var chartData = [];

                for (var i = 0; i < 10; i++) {

                    var percentCalculated = ((list[i][1] / usersCount[0].nonAtmelUser) * 100).toFixed(2);
                    list[i][0] = list[i][0].replace(".", "\n");
                    list[i][0] = list[i][0].replace("-", "\n");

                    chartData.push({
                        Company: list[i][0],
                        RegisteredUser: list[i][1],
                        Percentage: percentCalculated
                    });
                }
                var count = 1;
                list.forEach(function (receivedData) {
                    var percentCalculated = ((receivedData[1] / usersCount[0].nonAtmelUser) * 100).toFixed(2);
                    $scope.statistics.push({
                        no: count++,
                        company: receivedData[0],
                        users: receivedData[1],
                        percentage: percentCalculated
                    });
                });

                chartDataReceived = chartData;
                $scope.pagination.numPages = Math.ceil($scope.statistics.length / $scope.pagination.perPage);

                drawChart(chartData);

                $scope.IsReady = true;
            })
            .error(function (err) {
                console.log('Unable to get users details..!!')
                    //alert('warning', 'Unable to load gallery items', err.message);
            }).finally(function () {                
                $scope.contentLoaded = true;
            })
        $scope.stateChanged = function (hasChanged) {
            if (hasChanged === true) {
                $scope.showChart = false;
            } else {
                $scope.showChart = true;
                drawChart(chartDataReceived);
            }
        }
    });
