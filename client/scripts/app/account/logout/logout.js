'use strict';

angular.module('blaineApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('logout', {
                parent: 'account',
                url: '/logout',
                data: {
                    authorities: []
                },
                templateUrl: 'scripts/app/main/main.html',
                controller: 'LogoutController'
            });
    });
