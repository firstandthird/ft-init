module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    config: {
      info: grunt.file.readJSON('bower.json'),
      name: '{%= name %}',
      livereloadPort: Math.floor(Math.random() * 999) + 35000
    }
  });

};
