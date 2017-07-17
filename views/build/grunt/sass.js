module.exports = function(grunt) {
    'use strict';

    var sass    = grunt.config('sass') || {};
    var watch   = grunt.config('watch') || {};
    var notify  = grunt.config('notify') || {};
    var root    = grunt.option('root') + '/xmlEditQtiDebugger/views/';

    //override load path
    sass.xmleditqtidebugger = {
        options : {},
        files : {}
    };

    //files goes heres
    sass.xmleditqtidebugger.files[root + 'css/editor.css'] = root + 'scss/editor.scss';
    watch.xmleditqtidebuggersass = {
        files : [root + 'scss/**/*.scss'],
        tasks : ['sass:xmleditqtidebugger', 'notify:xmleditqtidebuggersass'],
        options : {
            debounceDelay : 500
        }
    };

    notify.xmleditqtidebuggersass = {
        options: {
            title: 'Grunt SASS',
            message: 'SASS files compiled to CSS'
        }
    };

    grunt.config('sass', sass);
    grunt.config('watch', watch);
    grunt.config('notify', notify);

    //register an alias for main build
    grunt.registerTask('xmleditqtidebuggersass', ['sass:xmleditqtidebugger']);
};
