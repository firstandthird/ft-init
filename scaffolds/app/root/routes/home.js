module.exports = function(server) {
  server.route({
      path: '/',
      method: 'GET',
      handler: function(request, reply) {
        reply.view('home/home', {
          isProd: (server.app.env == 'prod')
        });
      }
  });
};
