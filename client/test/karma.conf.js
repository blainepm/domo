// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            '../bower_components/modernizr/modernizr.js',
            '../bower_components/jquery/dist/jquery.js',
            '../bower_components/angular/angular.js',
            '../bower_components/angular-animate/angular-animate.js',
            '../bower_components/angular-aria/angular-aria.js',
            '../bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            '../bower_components/angular-cache-buster/angular-cache-buster.js',
            '../bower_components/angular-cookies/angular-cookies.js',
            '../bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
            '../bower_components/angular-local-storage/dist/angular-local-storage.js',
            '../bower_components/angular-resource/angular-resource.js',
            '../bower_components/angular-sanitize/angular-sanitize.js',
            '../bower_components/angular-translate/angular-translate.js',
            '../bower_components/messageformat/messageformat.js',
            '../bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
            '../bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            '../bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
            '../bower_components/angular-ui-router/release/angular-ui-router.js',
            '../bower_components/bootstrap/dist/js/bootstrap.js',
            '../bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
            '../bower_components/extras.angular.plus/ngplus-overlay.js',
            '../bower_components/json3/lib/json3.js',
            '../bower_components/ng-file-upload/ng-file-upload.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            // endbower

            '../scripts/app/app.js',
            '../scripts/app/**/*.js',
            '../scripts/components/**/*.{js,html}',

            'spec/**/*.js'
        ],


        // list of files / patterns to exclude
        exclude: [],

        preprocessors: {
            'spec/**/*.js': ['coverage']
        },

        reporters: ['dots', 'jenkins', 'coverage', 'progress'],
        //reporters: ['progress'],

        jenkinsReporter: {
            outputFile: 'build/test-results/karma/TESTS-results.xml'
        },

        coverageReporter: {
            dir: 'build/test-results/coverage',
            reporters: [
                {type: 'lcov', subdir: 'report-lcov'}
            ]
        },

        // web server port
        port: 9876,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
