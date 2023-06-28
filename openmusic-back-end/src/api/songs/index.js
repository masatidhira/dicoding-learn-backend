/* eslint-disable object-curly-spacing */
const SongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { services, validator }) => {
    const handler = new SongsHandler(services, validator);
    server.route(routes(handler));
  },
};
