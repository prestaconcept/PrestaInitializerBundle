/* global module: true */

//--------------------------------
//
// grunt config for js uglifying task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading uglify task configuration');

    return {
        uglify: {
            options: {
                // delete comments
                preserveComments: false,
                // delete white spaces
                beautify: false,
                // obfuscation
                mangle: {
                    except: ['jQuery']
                },
                // compression
                compress: {
                    // delete console functions
                    drop_console: true,
                }
            },
            process: {
                files: {
                    '<%= files.dest.scripts %>main<%= current_date %>.min.js': '<%= files.dest.scripts %>main<%= current_date %>.js'
                }
            }
        }
    };
};
