module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'build/css/app.css': 'stylesheets/app.scss',
        },
      },
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'static/', src: ['**'], dest: 'build/' },
        ],
      },
    },
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify'],
          ],
        },
        src: 'javascript/app.js',
        dest: 'build/js/app.js',
      },
    },
    watch: {
      scripts: {
        files: ['./javascript/**/*.js'],
        tasks: ['browserify'],
      },
      stylesheets: {
        files: ['./stylesheets/**/*.scss'],
        tasks: ['sass'],
      },
    },
    'gh-pages': {
      options: {
        base: 'build',
      },
      src: ['**'],
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['copy', 'sass', 'browserify']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);
};
