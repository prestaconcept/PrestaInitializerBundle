/* global module: true */

//--------------------------------
//
// grunt config for task which manage other tasks when a git action is triggered
//
//--------------------------------
module.exports = function(grunt) {
    "use strict";

    grunt.verbose.oklns('Loading githooks task configuration');

    return {
        githooks: {
            options: {
                command: './node_modules/.bin/grunt',
                template: './grunt-config/githooks/node.js.hb'
            },
            // launch a lint test before a commit
            precommit: {
                'pre-commit': 'lint'
            }
        }
    };
};
