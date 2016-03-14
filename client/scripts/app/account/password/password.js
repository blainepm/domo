'use strict';

angular.module('blaineApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('password', {
                parent: 'account',
                url: '/password',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.account.password'
                },
                templateUrl: 'scripts/app/account/password/password.html',
                controller: 'PasswordController',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('password');
                        return $translate.refresh();
                    }]
                }
            });
    });
