/* global module: true */

//--------------------------------
//
// grunt config for concatening task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading concat task configuration');

    return {
        concat: {
            // concat all style files to one just before minification
            styles: {
                files: {
                    '<%= files.dest.styles %>main<%= current_date %>.css': ['<%= files.dest.styles %>*.css']
                }
            },
            // concat all scripts files to one just before minification
            scripts: {
                options: {
                    separator: ';'
                },
                files: {
                    '<%= files.dest.scripts %>main<%= current_date %>.js': ['<%= files.dest.scripts %>*.js']
                }
            },

        }
    };
};
