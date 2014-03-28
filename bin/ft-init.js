#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var grunt = require('grunt');
var hooker = require('hooker');
var asset = path.resolve.bind(null, __dirname, '..');
var helpers = require(asset('node_modules/grunt-init/tasks/lib/helpers')).init(grunt);
var cwd = process.cwd();

var ftPackage = require(path.resolve(__dirname, '..', 'package.json'));
var ftVersion = ftPackage.version;
grunt.ftInit = {};
grunt.ftInit.version = ftVersion;

var updateNotifier = require('update-notifier');
var notifier = updateNotifier({
  packagePath: '../package.json'
});

if (notifier.update) {
  notifier.notify();
}

hooker.hook(grunt.task, 'init', function() {
  grunt.task.loadTasks(asset('node_modules/grunt-init/tasks'));
});

var update = false;
var type = process.argv[2] || '';

var libPackagePath = path.resolve(cwd, 'package.json');
if (fs.existsSync(libPackagePath)) {
  var libPackage = require(libPackagePath);
  if (!libPackage.meta.ftInit && !type) {
    throw new Error('Lib was not originally created with ftInit, you must pass in the lib type');
  }
  type = libPackage.meta.ftInit.type;
  update = true;
}

var typePath = path.resolve(__dirname, '../scaffolds/', type);

grunt.cli.tasks = ['init:'+typePath];

[
  'base',
  'tasks',
  'gruntfile',
  'completion',
  'npm',
].forEach(function(option) {
  delete grunt.cli.optlist[option];
});

var gruntOptions = {};
grunt.ftInit.type = type;

if (update) {
  gruntOptions.force = true;
  grunt.ftInit.update = true;
}
grunt.cli(gruntOptions);
