/* global module: true */

//--------------------------------
//
// grunt config for task which update urls
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading cssurlrewrite task configuration');

    var rewriteFunc = function(url, options, dataURI) {
            return url.replace('web/', '/');
        };

    return {
        // change url to be good wherever the file is
        cssUrlRewrite: {
            // define in /grunt-config/config.js
            process: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        src: '<%= files.cssurlrewrite %>', // Actual pattern(s) to match.
                        dest: '<%= path.working.styles %>',   // Destination path prefix.
                        flatten: true,
                        ext: '.css',   // Dest filepaths will have this extension.
                        extDot: 'last',   // Extensions in filenames begin after the last dot
                        rename: grunt.renamer.process
                    },
                ]
            },
            options: {
                skipExternal: true,
                rewriteUrl: rewriteFunc
            }
        }
    };
};
