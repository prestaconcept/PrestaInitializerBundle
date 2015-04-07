/* global module: true */

//--------------------------------
//
// grunt config for css linting task
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading csslint task configuration');

    return {
        csslint: {
            // check style files
            options: {
                // disallow warning for using @import
                'import': false,
                // disallow warning for using !important
                'important': false,
                // disallow warning for using box-sizing
                'box-sizing': false,
                // disallow warning for using .class.other-class
                'adjoining-classes': false,
                // disallow warning for using multiple defining of Hx
                'unique-headings': false,
                // disallow warning for defining Hx under class or element
                'qualified-headings': false,
                // disallow warning for prefixes
                'compatible-vendor-prefixes': false,
                'gradients': false,
                // disallow warning for using float
                'floats': false,
                // disallow warning for using width/height with padding/border/margin
                'box-model': false,
                // disallow warning for using [type='']
                'unqualified-attributes': false,
                // disallow warning for using outline: none
                'outline-none': false,
                // disallow warning for using non-shorthand property
                'shorthand': false,
                // disallow warning for using *
                'universal-selector': false,
                // disallow warning for using [type^='']
                'regex-selectors': false,
                // disallow warning for using negative text-indent
                'text-indent': false,
                // disallow warning for using many font-size
                'font-sizes': false,
                // allow star hack for IE7
                'star-property-hack': false,

                // Disallow with LESS usage
                'overqualified-elements': false,
                'duplicate-properties': false,
                'display-property-grouping': false
            },
            process: {
                src: '<%= files.lint.styles %>'
            }
        }
    };
};
