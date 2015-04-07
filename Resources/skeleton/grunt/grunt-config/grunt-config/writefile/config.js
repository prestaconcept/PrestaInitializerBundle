/* global module: true */

//--------------------------------
//
// grunt config for watching task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading writefile task configuration');

    return {
        writefile: {
            options: {
                data: {
                    watch: '<%= watchNeeded %>'
                },
                helpers: {                  // provide handlebars helper functions
                    rewrite: function (value) {
                        value = value.replace(/^web\//, '/');
                        return value;
                    }
                },
                paths: {
                    stylesheets: '<%= files.dest.styles %>*.css',
                    scripts: '<%= files.dest.scripts %>*.js'
                }
            },
            // rebuild style files
            styles: {
                src: './grunt-config/writefile/styles.html.hbs',
                dest: '<%= files.dest.stylesHtml %>/styles.html.twig'
            },
            // rebuild script files
            scripts: {
                src: './grunt-config/writefile/scripts.html.hbs',
                dest: '<%= files.dest.scriptsHtml %>/scripts.html.twig'
            }
        }
    };
};
