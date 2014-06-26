module.exports = function(grunt) {
  require('load-grunt-config')(grunt, {
    //jitGrunt: true,
    data: {
      dist: 'public/_dist',
      ui: 'public',
      livereloadPort: 35002
    }
  });
};
