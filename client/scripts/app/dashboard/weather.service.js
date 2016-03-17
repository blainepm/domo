'use strict';

angular.module('blaineApp')
    .factory('Weather', function ($resource) {
        return $resource('dashboard/weather', {}, {});
    })

    .factory('Forecast', function ($resource) {
        return $resource('dashboard/forecast/', {}, {});
    });
