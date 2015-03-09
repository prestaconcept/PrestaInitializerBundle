/* global module: true */

//--------------------------------
//
// grunt config for less preprocessing task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading less task configuration');

    return {
        // convert less files to css files
        // * files defined in /grunt-config/config.js
        less: {
            process: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        src: '<%= files.less %>', // Actual pattern(s) to match.
                        dest: '<%= path.working.styles %>',   // Destination path prefix.
                        flatten: true,
                        ext: '.css',   // Dest filepaths will have this extension.
                        extDot: 'last',   // Extensions in filenames begin after the last dot
                        rename: grunt.renamer.process
                    },
                ]
            }
        }
    };
};
