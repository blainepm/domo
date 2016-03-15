'use strict';

angular.module('blaineApp')
.controller('DashboardController', function ($scope, $filter, Principal, Weather) {
    Principal.identity().then(function(account) {
        $scope.account = account;
        $scope.isAuthenticated = Principal.isAuthenticated;
    });

    $scope.forcast = null;
    $scope.weather = null;

    Weather.getForcast(function(forcast) {
        $scope.forcast = forcast;
    });

    Weather.getWeather(function(weather){
        $scope.weather = weather;

        weather.main.tempdegre = $filter('number')( (weather.main.temp - 273.15), 1);
    });
});
