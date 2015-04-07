/* global module: true */

module.exports = function(grunt) {
    'use strict';

    grunt.renamer = {
        count: 1,
        ext: '',
        process: function(dest, src) {
            // get extension of the current file
            var currExt = src.substring(src.lastIndexOf('.'));

            // check the extension to define if the counter need to be reset
            if( grunt.renamer.ext !== currExt ) {
                grunt.renamer.count = 0;
            }

            // define new name of the file
            var prefix = ( grunt.renamer.count < 10 ) ? '0' + grunt.renamer.count : grunt.renamer.count,
                name = prefix + '-' + src;

            // update data for next turn
            grunt.renamer.count++;
            grunt.renamer.ext = currExt;

            // return file path of the new file
            return dest + name;
        }
    };
};
