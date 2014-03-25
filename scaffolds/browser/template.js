
exports.description = 'Javascript Lib for Browser';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

  init.process({ type: 'browser' }, [
    init.prompt('name'),
    init.prompt('description', ''),
    init.prompt('version', '0.0.1'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('author_name', 'First + Third'),
    init.prompt('licenses', 'MIT')
  ], function(err, props) {

    props.ftInitVersion = grunt.ftInitVersion;
    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);
    done();

  });
};
