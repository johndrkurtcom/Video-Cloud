module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      
      files: [
        '*.js',
      ],

      options:{
        force: 'true',
        jshintrc: '_.jshintrc',
        ignores:[
          'node_modules/*.js',
          'Gruntfile.js',
          'client/lib/*.js'
        ]
      },
    },

  });

  
  grunt.loadNpmTasks('grunt-contrib-jshint');


// Main grunt tasks

  grunt.registerTask('default', [
    'jshint'
  ]);

};
