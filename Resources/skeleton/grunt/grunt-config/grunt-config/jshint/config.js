/* global module: true */

//--------------------------------
//
// grunt config for js linting task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading jshint task configuration');

    return {
        // check js files
        jshint: {
            options: {
                // var must be in camelcase
                camelcase: true,
                // force usage of {}
                curly: true,
                // force usage of === instead of ==
                eqeqeq: true,
                // indent must be in 4 spaces
                indent: 4,
                // variable definitions must be before usage of them
                latedef: true,
                // prevent empty blocks
                noempty: true,
                // string must be defined with ' and no "
                quotmark: 'single',
                // check var/function not defined in file
                undef: true,
                // check var/function not used in file
                unused: true,

                // add some var to global to force passing unused and undef options
                // can be defined directly into files with:
                // /* global myVar: true */
                globals: {
                    jQuery: true,
                    $: true,
                    document: true,
                    window: true
                },
            },
            process: {
                src: '<%= files.lint.scripts %>'
            }
        }
    };
};
