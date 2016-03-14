'use strict';

angular.module('blaineApp.account', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('account', {
                abstract: true,
                parent: 'site',
                url : '/account',
                views: {
                    'content@': {
                        template: '<ui-view/>'
                    }
                },
            });
    });
