/* global module: true */

//--------------------------------
//
// grunt config for css minification task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading cssmin task configuration');

    return {
        // minifying style file
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            process: {
                files: {
                    '<%= files.dest.styles %>main<%= current_date %>.min.css': '<%= files.dest.styles %>main<%= current_date %>.css'
                }
            }
        }
    };
};
