module.exports = function(grunt) {

  require('ft-build')('browser', grunt, {
    name: '{%= name %}',
    port: '8001'
  });

};
