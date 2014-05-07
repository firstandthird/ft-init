module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    data: {
      projectName: 'Static Site',
      devDist: 'dist-dev',
      dist: 'dist'
    }

  });

  grunt.loadTasks('tasks');
};
