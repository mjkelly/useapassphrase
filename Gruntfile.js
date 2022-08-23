module.exports = function(grunt) {

  grunt.initConfig({
    inline: {
      dist: {
        src: 'index.html',
        dest: 'dist/index.html'
      }
    },
    assemble: {
      options: {
        marked: {
          breaks: false,
          gfm: true,
          },
      },
      site: {
        src: ['dist/index.html'],
        dest: 'dist/index.html'
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
