module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    data: {
      devDist: 'dist-dev',
      dist: 'dist'
    }

  });

  grunt.loadTasks('tasks');
};
