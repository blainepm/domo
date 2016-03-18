'use strict';

angular.module('blaineApp')
    .factory('errorHandlerInterceptor', function ($q, $rootScope) {
        return {
            'responseError': function (response) {
                console.log(response);
                if (!(response.status == 401/* && response.data.path.indexOf("/api/account") == 0 */)){
	                $rootScope.$emit('blaineApp.httpError', response);
	            }
                return $q.reject(response);
            }
        };
    });
