describe('App Tests config block', function () {
	var $httpProvider;

    beforeEach(function () {
        angular.module('httpProviderConfig', [])
            .config(function(_$httpProvider_) {
                $httpProvider = _$httpProvider_;
                // spyOn($locationProvider, 'html5Mode');
            });
        module('httpProviderConfig');
        module('blaineApp');
        inject();
    });

	it('should push interceptors', function() {
		expect($httpProvider.interceptors).toContain('errorHandlerInterceptor');
		expect($httpProvider.interceptors).toContain('authExpiredInterceptor');
        expect($httpProvider.interceptors).toContain('notificationInterceptor');
	});

	
    it('should set xsrf', function() {
		expect($httpProvider.defaults.xsrfCookieName).toBe('CSRF-TOKEN');
		expect($httpProvider.defaults.xsrfHeaderName).toBe('X-CSRF-TOKEN');
    });
	
});
