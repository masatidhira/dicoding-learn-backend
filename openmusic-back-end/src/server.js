/* eslint-disable object-curly-spacing */
require('dotenv').config();

const Hapi = require('@hapi/hapi');

const AlbumsPlugin = require('./api/albums');
const AlbumsService = require('./services/AlbumsServices');
const AlbumsValidator = require('./validators/Albums');

const SongsPlugin = require('./api/songs');
const SongsService = require('./services/SongsServices');
const SongsValidator = require('./validators/Songs');

const ClientError = require('./exceptions/ClientError');

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

  await server.register([
    {
      plugin: AlbumsPlugin,
      options: {
        service: AlbumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: SongsPlugin,
      options: {
        service: SongsService,
        validator: SongsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (error instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: error.message,
        });
        newResponse.code(error.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'Server Error',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server running on port: ${server.info.uri}`);
};

init();
