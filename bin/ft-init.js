#!/usr/bin/env node

var path = require('path');
var grunt = require('grunt');
var hooker = require('hooker');
var asset = path.resolve.bind(null, __dirname, '..');
var helpers = require(asset('node_modules/grunt-init/tasks/lib/helpers')).init(grunt);

var ftPackage = require(path.resolve(__dirname, '..', 'package.json'));
var ftVersion = ftPackage.version;
grunt.ftVersion = ftVersion;

var updateNotifier = require('update-notifier');
var notifier = updateNotifier();

if (notifier.update) {
  notifier.notify();
}

hooker.hook(grunt.task, 'init', function() {
  grunt.task.loadTasks(asset('node_modules/grunt-init/tasks'));
});

var type = process.argv[2];

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

grunt.cli();
