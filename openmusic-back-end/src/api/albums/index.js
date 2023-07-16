/* eslint-disable object-curly-spacing */
import AlbumsHandler from './handler.js';
import albumsRoutes from './routes.js';

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new AlbumsHandler(service, validator);
    server.route(albumsRoutes(handler));
  },
};
