module.exports = function(grunt) {

  grunt.initConfig({
    inline: {
      index: {
        src: 'index.html',
        dest: 'dist/index.html'
      },
      bench: {
        src: 'benchmark.html',
        dest: 'dist/benchmark.html'
      },
    },
    assemble: {
      options: {
        marked: {
          breaks: false,
          gfm: true,
          },
      },
      index: {
        src: ['dist/index.html'],
        dest: 'dist/index.html'
      },
      bench: {
        src: ['dist/benchmark.html'],
        dest: 'dist/benchmark.html'
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'dist',
          keepalive: true,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-connect')

  grunt.registerTask('default', ['inline', 'assemble']);

};
