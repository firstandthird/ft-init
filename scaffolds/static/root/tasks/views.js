module.exports = function(grunt) {

  var Hogan = require('hogan.js');
  var path = require('path');

  var toCamel = function(str) {
    return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
  };

  var readDir = function(pattern) {
    var obj = {};
    var files = grunt.file.expand(pattern);
    files.forEach(function(file) {
      var ext = path.extname(file);
      var basename = toCamel(path.basename(file, ext));
      if (ext == '.yaml') {
        obj[basename] = grunt.file.readYAML(file);
      } else {
        obj[basename] = grunt.file.read(file);
      }
    });
    return obj;
  };

  grunt.registerMultiTask('views', function() {
    var opts = this.options();

    this.files.forEach(function(file) {

      if (file.src.length != 1) {
        throw new Error('must only be one source file');
      }

      var src = file.src[0];
      var dest = file.dest;
      var partials = null;
      var data = {};

      if (opts.partials) {
        partials = readDir(opts.partials);
      }

      if (opts.data) {
        data = readDir(opts.data);
      }

      data.filename = src;
      data.basename = path.basename(src, '.html');
      var contents = grunt.file.read(src);
      var template = Hogan.compile(contents);
      var output = template.render(data, partials);

      grunt.file.write(dest, output);
      grunt.log.ok(dest + ' file written');

    });

  });
};
