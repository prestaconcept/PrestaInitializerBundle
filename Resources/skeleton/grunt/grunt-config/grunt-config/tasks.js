/* global module: true */

module.exports = function(grunt) {
    "use strict";

    // task to restore file config to undefined
    grunt.registerTask('reinit-files-config', 'Restor the files config to undefined' , function(){
        grunt.config('files', undefined);
    });

    // task to build style
    grunt.registerTask('build-styles', 'Build Style for Application' , function(app, reinit){
        var apps = grunt.config('apps'),
            watch = grunt.config('watchNeeded');

        reinit = (reinit === 'false' || watch) ? false : true;

        if (app === undefined) {
            for (var appName in apps) {
                grunt.task.run('build-styles:' + appName);
            }
        } else {
            if (apps[app] !== undefined) {
                // check that files config is loaded
                if (grunt.config('files') === undefined) {
                    grunt.config('files', apps[app]);
                }

                grunt.task.run([
                    'clean:styles'
                ]);

                // only launch if more than 0 files need to be rewrite
                // only external files can be rewrite
                var rewrite = grunt.config('files.cssurlrewrite');
                if (rewrite.length > 0) {
                    grunt.task.run('cssUrlRewrite');
                }

                grunt.task.run([
                    'less',
                    'copy:styles',
                    'writefile:styles',
                    'clean:workingStyles'
                ]);

                if (reinit === true) {
                    grunt.task.run([
                        'reinit-files-config'
                    ]);
                }

                grunt.renamer.reset();
            }
        }
    });

    // task to build scripts
    grunt.registerTask('build-scripts', 'Build Style for Application', function(app, reinit){
        var apps = grunt.config('apps'),
            watch = grunt.config('watchNeeded');

        reinit = (reinit === 'false' || watch) ? false : true;

        if (app === undefined) {
            for (var appName in apps) {
                grunt.task.run('build-scripts:' + appName);
            }
        } else {
            if (apps[app] !== undefined) {
                // check that files config is loaded
                if (grunt.config('files') === undefined) {
                    grunt.config('files', apps[app]);
                }

                grunt.task.run([
                    'clean:scripts', // clean older scripts
                    'copy:scripts', // add new scripts
                    'writefile:scripts'
                ]);

                if (reinit === true) {
                    grunt.task.run([
                        'reinit-files-config'
                    ]);
                }

                grunt.renamer.reset();
            }
        }
    });

    // task to test validity of asset files
    grunt.registerTask('lint', 'Lint files for Application', function(app, reinit){
        var apps = grunt.config('apps'),
            watch = grunt.config('watchNeeded');

        reinit = (reinit === 'false' || watch) ? false : true;

        if (app === undefined) {
            for (var appName in apps) {
                grunt.task.run('lint:' + appName);
            }
        } else {
            if (apps[app] !== undefined) {
                // check that files config is loaded
                if (grunt.config('files') === undefined) {
                    grunt.config('files', apps[app]);
                }

                grunt.task.run([
                    'jshint',

                    'less', // recreate a file can be linting by csslint
                    'csslint',
                    'clean:workingStyles', // destroy linting file
                ]);

                if (reinit === true) {
                    grunt.task.run([
                        'reinit-files-config'
                    ]);
                }
            }
        }
    });

    // task to minify asset files
    grunt.registerTask('minify', 'Minify files for Application', function(app, reinit){
        var apps = grunt.config('apps'),
            watch = grunt.config('watchNeeded');

        reinit = (reinit === 'false' || watch) ? false : true;

        if (app === undefined) {
            for (var appName in apps) {
                grunt.config('files', apps[appName]);
                grunt.task.run('minify:' + appName);
            }
        } else {
            if (apps[app] !== undefined) {
                // check that files config is loaded
                if (grunt.config('files') === undefined) {
                    grunt.config('files', apps[app]);
                }

                grunt.task.run([
                    'concat:scripts',
                    'uglify',
                    'concat:styles',
                    'cssmin'
                ]);

                if (reinit === true) {
                    grunt.task.run([
                        'reinit-files-config'
                    ]);
                }
            }
        }
    });

    // task to build asset files for production environment
    grunt.registerTask('publish', 'Install Assets for Application', function(app){
        var apps = grunt.config('apps');

        if (app === undefined) {
            for (var appName in apps) {
                grunt.task.run('publish:' + appName);
            }
        } else {
            if (apps[app] !== undefined) {
                // check that files config is loaded
                if (grunt.config('files') === undefined) {
                    grunt.config('files', apps[app]);
                }

                grunt.task.run([
                    'build-styles:' + app + ':false',
                    'build-scripts:' + app + ':false',
                    'lint:' + app + ':false',
                    'minify:' + app + ':false',
                    'clean:after',
                    'writefile',
                    'reinit-files-config'
                ]);
            }
        }
    });

    //----------------------
    // DEVELOPPEMENT ENVIRONMENT
    //----------------------

    // task to launch in dev to watch an app
    // @params String app - name of the app
    // @params Boolean watch - true to launch watch task
    grunt.registerTask('dev-watch', function(app){
        app = app || 'front';

        var apps = grunt.config('apps');

        if (apps[app] !== undefined) {
            // check that files config is loaded
            if (grunt.config('files') === undefined) {
                grunt.config('files', apps[app]);
            }

            grunt.task.run('watch');
        }
    });

    // task to launch in dev to publish asset files
    // @params String app - name of the app
    // @params Boolean watch - true to launch watch task
    grunt.registerTask('dev-publish', function(app, watch){
        grunt.config('watchNeeded', (watch === 'true'));

        var apps = grunt.config('apps');

        if (app === undefined) {
            for (var appName in apps) {
                grunt.task.run('dev-publish:' + appName);
            }
        } else {
            if (apps[app] !== undefined) {
                // check that files config is loaded
                if (grunt.config('files') === undefined) {
                    grunt.config('files', apps[app]);
                }

                grunt.task.run([
                    'build-styles:' + app + ':false',
                    'build-scripts:' + app + ':false'
                ]);
            }

            if (grunt.config('watchNeeded') === true) {
                grunt.task.run('dev-watch');
            } else {
                grunt.task.run([
                    'reinit-files-config'
                ]);
            }
        }
    });


    //----------------------
    // PRODUCTION INSTALLATION
    //----------------------

    // by default, the build task is triggered
    grunt.registerTask('default', 'publish');

};
