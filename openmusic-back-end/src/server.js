require('dotenv').config();

const Hapi = require('@hapi/hapi');
const SongsPlugin = require('./api/songs');
const SongsService = require('./services');
const SongsValidator = require('./validators');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: SongsPlugin,
    options: {
      service: SongsService,
      validator: SongsValidator,
    },
  });

  await server.start();
  console.log(`Server running on port: ${server.info.uri}`);
};

init();
