// Generated on 2015-09-22 using generator-angular-app 0.1.0
'use strict';
var fs = require('fs'),
packagejs = require('./package.json');


// usemin custom step
var useminAutoprefixer = {
    name: 'autoprefixer',
    createConfig: function(context, block) {
        if(block.src.length === 0) {
            return {};
        } else {
            return require('grunt-usemin/lib/config/cssmin').createConfig(context, block) // Reuse cssmins createConfig
        }
    }
};

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: '../server/dist'
        },
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            ngconstant: {
                files: ['Gruntfile.js'],
                tasks: ['ngconstant:dev']
            },
            sass: {
                files: ['assets/scss/**/*.{scss,sass}'],
                tasks: ['sass:server']
            }
        },
        autoprefixer: {
            // src and dest is configured in a subtask called "generated" by usemin
        },

        wiredep: {
            app: {
                src: ['index.html', 'assets/scss/main.scss'],
                exclude: [
                    /angular-i18n/,  // localizations are loaded dynamically
                    'bower_components/bootstrap/' // Exclude Bootstrap LESS as we use bootstrap-sass
                ],
                ignorePath: /\.\.\/bower_components\//
            },
            test: {
                src: 'test/karma.conf.js',
                exclude: [/angular-i18n/, /angular-scenario/],
                ignorePath: /\.\.\/\.\.\//, // remove ../../ from paths of injected javascripts
                devDependencies: true,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        },

        sass: {
            options: {
                includePaths: [
                    'bower_components'
                ]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: 'assets/scss',
                    src: ['*.scss'],
                    dest: 'assets/styles',
                    ext: '.css'
                }]
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './**/*.html',
                        './**/*.json',
                        './assets/styles/**/*.css',
                        './scripts/**/*.js',
                        './assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    },
                }
            },
            prod: {
                bsFiles: {
                    src : [
                        '../server/dist/**/*.html',
                        '../server/dist/**/*.json',
                        '../server/dist/assets/styles/**/*.css',
                        '../server/dist/scripts/**/*.js',
                        '../server/dist/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "../server/dist"
                    },
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '../server/dist/*',
                        '!../server/dist/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'scripts/app.js',
                'scripts/app/**/*.js',
                'scripts/components/**/*.js'
            ]
        },
        concat: {
            // src and dest is configured in a subtask called "generated" by usemin
        },
        uglifyjs: {
            // src and dest is configured in a subtask called "generated" by usemin
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '../server/dist/scripts/**/*.js',
                        '../server/dist/assets/styles/**/*.css',
                        '../server/dist/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        '../server/dist/assets/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: './**/*.html',
            options: {
                dest: '../server/dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin', useminAutoprefixer] // Let cssmin concat files so it corrects relative paths to fonts and images
                        },
                            post: {}
                        }
                    }
            }
        },
        usemin: {
            html: ['../server/dist/**/*.html'],
            css: ['../server/dist/assets/styles/**/*.css'],
            js: ['../server/dist/scripts/**/*.js'],
            options: {
                assetsDirs: ['../server/dist', '../server/dist/assets/styles', '../server/dist/assets/images', '../server/dist/assets/fonts'],
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                },
                dirs: ['../server/dist']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '**/*.{jpg,jpeg}', // we don't optimize PNG files as it doesn't work on Linux. If you are not on Linux, feel free to use '**/*.{png,jpg,jpeg}'
                    dest: '../server/dist/assets/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '**/*.svg',
                    dest: '../server/dist/assets/images'
                }]
            }
        },
        cssmin: {
            // src and dest is configured in a subtask called "generated" by usemin
        },
        ngtemplates:    {
            dist: {
                // cwd: './',
                src: ['scripts/app/**/*.html', 'scripts/components/**/*.html',],
                dest: '.tmp/templates/templates.js',
                options: {
                    module: 'blaineApp',
                    usemin: 'scripts/app.js',
                    htmlmin: '<%= htmlmin.dist.options %>'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    keepClosingSlash: true
                },
                files: [{
                    expand: true,
                    cwd: '../server/dist',
                    src: ['*.html'],
                    dest: '../server/dist'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: './',
                    dest: '../server/dist/assets/fonts',
                    src: [
                      'bower_components/bootstrap/fonts/*.*'
                    ]
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    dest: '../server/dist',
                    src: [
                        '*.html',
                        'scripts/**/*.html',
                        'assets/images/**/*.{png,gif,webp,jpg,jpeg,svg}',
                        'assets/fonts/*',
                        'i18n/**/*.json',
                        'bower_components/angular-i18n/angular-locale_en.js'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/assets/images',
                    dest: '../server/dist/assets/images',
                    src: [
                        'generated/*'
                    ]
                }]
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        ngconstant: {
            options: {
                name: 'blaineApp',
                deps: false,
                wrap: '"use strict";\n// DO NOT EDIT THIS FILE, EDIT THE GRUNT TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n{%= __ngModule %}'
            },
            dev: {
                options: {
                    dest: 'scripts/app/app.constants.js'
                },
                constants: {
                    ENV: 'dev',
                    VERSION: packagejs.version
                }
            },
            prod: {
                options: {
                    dest: '.tmp/scripts/app/app.constants.js'
                },
                constants: {
                    ENV: 'prod',
                    VERSION: packagejs.version
                }
            }
        }
    });

    grunt.registerTask('serve', [
        'clean:server',
        'wiredep',
        'ngconstant:dev',
        'sass:server',
        'browserSync:dev',
        'watch'
    ]);

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'wiredep:test',
        'ngconstant:dev',
        'sass:server',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep:app',
        'ngconstant:prod',
        'useminPrepare',
        'ngtemplates',
        'sass:server',
        'imagemin',
        'svgmin',
        'concat',
        'copy:fonts',
        'copy:dist',
        'ngAnnotate',
        'cssmin',
        'autoprefixer',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('serve:prod', [
        'clean:server',
        'browserSync:prod',
        'watch'
    ]);

    grunt.registerTask('default', ['serve']);
};
