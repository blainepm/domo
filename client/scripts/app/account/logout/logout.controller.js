'use strict';

angular.module('blaineApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
