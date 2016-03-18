'use strict';

angular.module('blaineApp.admin', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                abstract: true,
                parent: 'site',
                url : '/admin',
                views: {
                    'content@': {
                        template: '<ui-view/>'
                    }
                },
            });
    });
