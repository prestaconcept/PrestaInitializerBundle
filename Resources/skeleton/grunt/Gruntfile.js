/* global module: true */
/* global require: true */

module.exports = function(grunt) {
    "use strict";

    var path = './grunt-config/';

    /*** External config & tasks filepaths ***/
    var configLocations = [
            path + 'config.js',
            path + 'utils.js',
            path + 'clean/config.js',
            path + 'concat/config.js',
            path + 'copy/config.js',
            path + 'cssmin/config.js',
            path + 'less/config.js',
            path + 'cssurlrewrite/config.js',
            path + 'uglify/config.js',
            path + 'watch/config.js',
            path + 'jshint/config.js',
            path + 'csslint/config.js',
            path + 'githooks/config.js',
            path + 'writefile/config.js'
        ];

    var tasksLocations = [
            path + 'tasks.js'
        ];


    /***************** External configuration management ***********************************/
    grunt.verbose.writeln('Gathering external configuration files'.underline.green);

    var configFiles = grunt.file.expand({filter: "isFile"}, configLocations);

    grunt.verbose.writeln("Config files : " + grunt.verbose.wordlist(configFiles, {
        separator: ', ',
        color: 'cyan'
    }));

    var configArray = configFiles.map(function(file) {
        grunt.verbose.writeln("=> importing : " + file);
        return require(file)(grunt);
    });

    configArray.forEach(function(config) {
        grunt.config.merge(config);
    });

    /***************** Task loading & registering *******************************************/
    // We load grunt tasks listed in package.json file
    require('load-grunt-tasks')(grunt);

    /****** External tasks registering ****************/
    grunt.verbose.writeln('Gathering external task files'.underline.green);

    var taskFiles = grunt.file.expand({filter: "isFile"}, tasksLocations);

    grunt.verbose.writeln("Task files : " + grunt.verbose.wordlist(taskFiles, {
        separator: ', ',
        color: 'cyan'
    }));

    taskFiles.forEach(function(path) {
        grunt.verbose.writeln("=> loading & registering : " + path);
        require(path)(grunt);
    });

    //write the generated configuration in console (for debug)
    grunt.registerTask('logConfig', 'Display the generated Gruntfile', function() {
        //grunt.task.run(['attention:gruntfile']);
        grunt.log.subhead('* Generated configuration : *');
        grunt.log.writeln(JSON.stringify(grunt.config.get(), undefined, 2));
    });
};
