/* eslint-disable object-curly-spacing */
import SongsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new SongsHandler(service, validator);
    server.route(routes(handler));
  },
};
