
exports.description = 'Javascript Lib for Browser';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

  var defaults = {
    name: '',
    description: '',
    version: '0.0.1',
    homepage: '',
    author_name: 'First+Third',
    licenses: 'MIT'
  }
  if (grunt.ftInit.update) {
    var path = require('path');
    var bowerJson = require(path.join(process.cwd(), 'bower.json'));
    defaults.name = bowerJson.name;
    defaults.description = bowerJson.description;
    defaults.version = bowerJson.version;
    defaults.homepage = bowerJson.homepage;
    defaults.author_name = bowerJson.copyright;
    defaults.licenses = bowerJson.license;
  }

  console.log(defaults);

  init.process({ type: 'browser' }, [
    init.prompt('name', defaults.name),
    init.prompt('description', defaults.description),
    init.prompt('version', defaults.version),
    init.prompt('homepage', defaults.homepage),
    init.prompt('author_name', defaults.author_name),
    init.prompt('licenses', defaults.licenses)
  ], function(err, props) {

    props.ftInit = grunt.ftInit;
    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);
    done();

  });
};
