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
            // rebuild style files
            styles: {
                files: '<%= files.watch.styles %>',
                tasks: ['build-styles']
            },
            // rebuild script files
            scripts: {
                files: '<%= files.watch.scripts %>',
                tasks: ['build-scripts']
            },
            // reload assets and html in live
            // add at the end of your layout:
            //  <script type="text/javascript" src="http://localhost:35729/livereload.js"></script>
            //  localhost because the server is normally launch outer of the vagrant
            livereload: {
                files: ['<%= path.dest.styles %>**/*', '<%= path.dest.scripts %>**/*', 'src/**/*.html.twig'],
                options: {
                    livereload: true
                }
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
