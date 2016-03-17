'use strict';

angular.module('blaineApp')
.controller('DashboardController', function ($scope, $filter, $timeout, Principal, Weather, Forecast) {
    Principal.identity().then(function(account) {
        $scope.account = account;
        $scope.isAuthenticated = Principal.isAuthenticated;
    });

    $scope.forecasts = [];
    $scope.weather = null;

    Forecast.get(function(forecasts) {
        var tomorrow = new Date();

        angular.forEach(forecasts.list, function(forecast, key) {
            //convertion seconde en milliseconde
            var dt_date = new Date(forecast.dt * 1000);

            if(dt_date.getDate() > tomorrow.getDate() && dt_date.getHours() > 15 && dt_date.getHours() < 17)
            {
                forecast.dt_date = dt_date;
                forecast.tempdegre = $filter('number')( (forecast.main.temp - 273.15), 1);
                $scope.forecasts.push(forecast);
            }
        });
    });

    $timeout(function(){
        Weather.get(function(weather) {
            $scope.weather = weather;
            $scope.weather.tempdegre = $filter('number')( ($scope.weather.main.temp - 273.15), 1);
        });
    }, 1500);
});
