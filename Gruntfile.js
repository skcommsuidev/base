module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        useminPrepare: {
            html: 'dist/html/**/*.html'
        },
        usemin: {
            html: 'dist/html/**/*.html',
            options: {
                blockReplacements: {
                    css: function(block) {
                        return '<link rel="stylesheet" href="../' + block.dest + '"/>';
                    },
                    js: function(block) {
                        return '<script src="../' + block.dest + '"></script>';
                    }
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js']
        },
        copy: {
            html: {
                expand: true,
                cwd: 'web/',
                src: 'html/**/*.html',
                dest: 'dist/html',
                flatten: true,
                filter: 'isFile'
            },
            css: {
                expand: true,
                cwd: 'web/',
                src: 'css/**/*.css',
                dest: 'dist/css',
                flatten: true,
                filter: 'isFile'
            },
            js: {
                expand: true,
                cwd: 'src/',
                src: '**/*.js',
                dest: 'dist/js',
                flatten: true,
                filter: 'isFile'
            }
        },
        clean: {
            before: {
                files: [{
                    dot: true,
                    src: [
                        'dist/*',
                        '!dist/.git*'
                    ]
                }]
            },
            css: ['dist/css/*.css', '!dist/css/*.min.css'],
            js: ['dist/js/*.js', '!dist/js/*.min.js']
        },
        uglify: {
            options: {
                compress:{
                    hoist_vars: false
                },
                mangle: true
            },
            generated: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: '{,*/}*.min.js',
                    dest: 'dist/js'
                }]
            }
        },
        concat: {
            generated: {}
        },
        cssmin: {
            generated: {}
        },
        imagemin: {
            generated: {
                files: [{
                    expand: true,
                    cwd: 'web/img',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: 'dist/img'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-usemin');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'jshint']);
    grunt.registerTask('build', [
        'clean:before',
        'copy:html',
        'copy:css',
        'copy:js',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin',
        'imagemin',
        'clean:css',
        'clean:js',
        'jshint'
    ]);

};