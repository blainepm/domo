'use strict';

angular.module('blaineApp')
.controller('DashboardController', function ($scope, $filter, Principal, Weather, Forecast) {
    Principal.identity().then(function(account) {
        $scope.account = account;
        $scope.isAuthenticated = Principal.isAuthenticated;
    });

    $scope.forcast = null;
    $scope.weather = null;

    Forecast.get(function(forcast) {
        $scope.forcast = forcast;
        console.log($scope.forcast);
    });

    Weather.get(function(weather) {
        $scope.weather = weather;

        $scope.weather.tempdegre = $filter('number')( ($scope.weather.main.temp - 273.15), 1);

        console.log($scope.weather);
    });
});
