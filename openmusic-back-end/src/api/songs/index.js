/* eslint-disable object-curly-spacing */
import SongsHandler from './handler';
import routes from './routes';

export default {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new SongsHandler(service, validator);
    server.route(routes(handler));
  },
};
