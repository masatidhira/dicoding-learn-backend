/* eslint-disable object-curly-spacing */
const AlbumsHandler = require('./handler');
const albumsRoutes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new AlbumsHandler(service, validator);
    server.route(albumsRoutes(handler));
  },
};
