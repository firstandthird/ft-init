
exports.description = 'Hapi app';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

  init.process({ type: 'app' }, [
  ], function(err, props) {

    props.ftInit = grunt.ftInit;
    var files = init.filesToCopy(props);
    if (grunt.ftInit.update) {
      delete files['CHANGELOG.md'];
      delete files['README.md'];
    }

    //remove bower_components and node_module files
    for (var file in files) {
      if (file.match(/^dist|^bower_components|^node_modules/) !== null) {
        delete files[file];
      }
    }

    //fix for gitignore
    files['.gitignore'] = files.gitignore;
    delete files.gitignore;

    init.copyAndProcess(files, props);
    done();

  });
};
