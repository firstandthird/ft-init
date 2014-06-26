module.exports = function(server) {
  server.route({
    path: '/ui/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: './public/_dist',
        listing: false,
        index: false
      }
    }
  });
};
