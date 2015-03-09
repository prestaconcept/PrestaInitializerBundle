/* global module: true */

//--------------------------------
//
// grunt config for watching task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading watch task configuration');

    return {
        watch: {
            options: {
                livereload: true
            },
            // rebuild style files
            styles: {
                files: '<%= files.watch.styles %>',
                tasks: ['build-styles'],
                options: {
                    spawn: false
                }
            },
            // rebuild script files
            scripts: {
                files: '<%= files.watch.scripts %>',
                tasks: ['build-scripts'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['src/**/*.html.twig']
            },
            gruntfile: {
                files: ['grunt-config/**/*'],
                options: {
                    reload: true
                }
            }
        }
    };
};
