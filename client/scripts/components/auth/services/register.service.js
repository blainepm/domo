'use strict';

angular.module('blaineApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


