/* global module: true */

module.exports = function(grunt) {
    'use strict';

    grunt.verbose.oklns('Loading default configuration');

    // list of applications and files associated
    var apps = grunt.file.readJSON('grunt-config/project.json');

    // General Process:
    //
    // 1. delete previously generated files
    //
    // 2. less files in bundles ressources (styles/less directory) -> css files in bundles ressources (styles/css directory)
    // 3. css external libs files -> copy into bundles ressources (styles/css directory) after an url rewriting
    // 4. check the validity of project's scripts (not external lib)
    // 5. assets in bundles ressources (scripts and styles/css directories) copy into /web (scripts or styles directory)
    // 6. check the validity of project's styles (not external lib)
    // 7. delete generated css files in bundles ressources (styles/css directory)
    //
    // ---- After this point not necessary in development environment
    //
    // 8. combine all style files into one and same process for scripts files (web directories) --> add date to the filename
    // 9. minify these files --> add .min to the filename
    // 10. delete not combining files


    var config = {
        /** Constants **/
        path: {
            root: 'web/bundles/',
            prestaComposer: '<%= path.root %>prestacomposerpublic/',
            routing: '<%= path.root %>fosjsrouting/',
            dest: {
                styles: 'web/styles/apps/',
                stylesHtml: 'app/Resources/views/apps/',
                scripts: 'web/scripts/apps/',
                scriptsHtml: 'app/Resources/views/apps/'
            },
            working: {
                styles: 'web/styles/working/',
                scripts: 'web/scripts/working/'
            }
        },
        apps: {},
        watchNeeded: false,

        // date to add to generated filename
        current_date: grunt.template.today("yyyymmddHHMMss"),

    }; //end config


    // add config for each application
    for (var appName in apps) {
        var app = apps[appName];

        config.apps[appName] = {
            dest: {
                styles: config.path.dest.styles + appName + '/',
                stylesHtml: config.path.dest.styles + appName + '/',
                scripts: config.path.dest.scripts + appName + '/',
                scriptsHtml: config.path.dest.scripts + appName + '/'
            },

            // list of couple dist: src
            less: app.styles.project,

            // as less, list of couple dist: src
            cssurlrewrite: app.styles.libs,

            // files to copy into the web/...
            copy: {
                // ...styles directory (css generated files from less are automaticaly added)
                styles: ['<%= path.working.styles %>*.css'],
                // ...scripts directory
                scripts: [].concat(
                    app.scripts.libs,
                    app.scripts.project
                )
            },

            // files needing to be linting
            // only lint files developped by presta team
            // because external libs can have some errors
            lint: {
                // lint the generated css file
                styles: ['<%= path.working.styles %>*.css'],
                // lint all scripts developped by presta team
                scripts: app.scripts.project
            },

            // watching files
            watch: {
                // all file in the projects less folder
                styles: ['<%= path.root %>**/*.less', '<%= path.root %>**/*.css'],
                // all scripts developped by presta team
                scripts: '<%= apps.' + appName + '.copy.scripts %>'
            }
        };

        // add configuration for jsRouting if necessary
        if (app.useJsRouting === true) {
            config.apps[appName].copy.scripts = [].concat(
                config.apps[appName].copy.scripts,
                [
                    '<%= path.routing %>js/router.js',
                    'web/js/fos_js_routes.js'
                ]
            );
        }
    }

    return config;

};
