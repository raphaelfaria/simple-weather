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
          // exclude: [
          //   'react',
          //   'react-dom',
          // ],
          transform: [
            ['babelify'],
          ],
        },
        files: {
          './build/js/app.js': [
            './javascript/app.js',
            './javascript/components/*.js',
          ],
        },
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
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['copy', 'sass', 'browserify']);
};
