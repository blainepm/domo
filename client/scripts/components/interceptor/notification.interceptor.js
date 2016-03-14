 'use strict';

angular.module('blaineApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-blaineApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-blaineApp-params')});
                }
                return response;
            },
        };
    });