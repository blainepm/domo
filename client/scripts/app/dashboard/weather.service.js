'use strict';

angular.module('blaineApp')
    .factory('Weather', function ($resource) {
        return $resource('', {}, {
            'getForcast': { url : 'http://api.openweathermap.org/data/2.5/forecast/city' ,method: 'GET', params: {'lat':45.490697, 'lon':4.450013, 'APPID': 'cc0802162cf56089d0da91b734449275'}, isArray: false},
            'getWeather': { url : 'http://api.openweathermap.org/data/2.5/weather/' ,method: 'GET', params: {'lat':45.490697, 'lon':4.450013, 'APPID': 'cc0802162cf56089d0da91b734449275'}, isArray: false}
        });
    });
