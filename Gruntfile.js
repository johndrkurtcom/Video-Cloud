module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: [
        '*.js'
      ],
    },

  });

  
  grunt.loadNpmTasks('grunt-contrib-jshint');


// Main grunt tasks

  grunt.registerTask('default', [
    'jshint'
  ]);

};
