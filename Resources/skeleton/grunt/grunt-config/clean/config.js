/* global module: true */

//--------------------------------
//
// grunt config for cleaning task
//
//--------------------------------
module.exports = function(grunt) {
    'use strict';

    grunt.verbose.oklns('Loading clean task configuration');

    var app = grunt.config('app');

    return {
        clean: {
            // delete all previously generated styles from web
            styles: {
                files: [{
                    dot: true,
                    src: [ '<%= files.dest.styles %>/*.css', '<%= files.dest.stylesHtml %>/*.html.twig' ]
                }]
            },
            // delete all previously generated scripts from web
            scripts: {
                files: [{
                    dot: true,
                    src: [ '<%= files.dest.scripts %>/*.js', '<%= files.dest.scriptsHtml %>/*.html.twig' ]
                }]
            },
            // delete files which are been copied into web after less processor and url rewriting
            workingStyles: {
                files: [{
                    dot: true,
                    src: '<%= path.working.styles %>'
                }]
            },
            // delete all working files
            // * must be launch only on non dev environnement to keep non minify files
            after: {
                files: [{
                    dot: true,
                    src: [
                        '<%= files.dest.styles %>*.css',
                        '!<%= files.dest.styles %>*<%= current_date %>.min.css',
                        '<%= files.dest.scripts %>*.js',
                        '!<%= files.dest.scripts %>*<%= current_date %>.min.js'
                    ]
                }]
            },
        }
    };
};
