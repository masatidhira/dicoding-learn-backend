/* eslint-disable object-curly-spacing */
const AlbumsHandler = require('./handler');
const albumsRoutes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { services, validator }) => {
    const handler = new AlbumsHandler(services, validator);
    server.route(albumsRoutes(handler));
  },
};
