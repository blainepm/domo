'use strict';

angular.module('blaineApp')
    .factory('Weather', function ($resource) {
        return $resource('http://api.openweathermap.org/data/2.5/forecast/city', {}, {
            'getForcast': { method: 'GET', params: {'lat':45.490697, 'lon':4.450013, 'APPID': 'cc0802162cf56089d0da91b734449275'}, isArray: false}
        });
    });
