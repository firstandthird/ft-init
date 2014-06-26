var Hapi = require('hapi');
var port = process.env.PORT || 8080;
var server = new Hapi.Server(port, '0.0.0.0');
var glob = require('glob');
var lout = require('lout');
var db = require('./lib/db');

server.app.env = (process.env.NODE_ENV == 'production') ? 'prod' : 'dev';

//view engine
var Handlebars = require('handlebars');
require('handlebars-layouts')(Handlebars);
server.views({
  engines: { 
    html: Handlebars
  },
  path: __dirname + '/public/pages',
  isCached: false,
  partialsPath: __dirname + '/public/modules',
  //helpersPath: __dirname + '/templates/helpers'
});

glob.sync(__dirname + '/routes/*.js').forEach(function(file) {
  require(file)(server, db);
});

server.pack.register([
  { plugin: lout }
], function(err) {
  if (err) {
    throw err;
  }
  server.start(function() {
    console.log('Hapi server started @', server.info.uri);
  });
});
