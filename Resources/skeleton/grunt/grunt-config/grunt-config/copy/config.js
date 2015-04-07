/* global module: true */

//--------------------------------
//
// grunt config for copy task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading copy task configuration');

    return {
        copy: {
            // copy style files from bundle(s) to web directory
            styles: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= files.copy.styles %>',
                        dest: '<%= files.dest.styles %>',
                    }
                ]
            },
            // copy script files from bundle(s) to web directory
            scripts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= files.copy.scripts %>',
                        dest: '<%= files.dest.scripts %>',
                        rename: grunt.renamer.process
                    }
                ],
            }
        }
    };
};
