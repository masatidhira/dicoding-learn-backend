/* eslint-disable object-curly-spacing */
import dotenv from 'dotenv';
dotenv.config();

import Hapi from '@hapi/hapi';

import AlbumsPlugin from './api/albums/index.js';
import AlbumsService from './services/AlbumsServices.js';
import AlbumsValidator from './validators/Albums/index.js';

import SongsPlugin from './api/songs/index.js';
import SongsService from './services/SongsServices.js';
import SongsValidator from './validators/Songs/index.js';

import ClientError from './exceptions/ClientError.js';

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
