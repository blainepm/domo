'use strict';

angular.module('blaineApp')
    .controller('DashboardController', function ($scope, Principal, Weather) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });

        Weather.getForcast(function(forcast) {
            console.log(forcast);
        });
    });
