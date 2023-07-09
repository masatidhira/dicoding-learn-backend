require('dotenv').config();

const Hapi = require('@hapi/hapi');

const AlbumsPlugin = require('./api/albums');
const AlbumsService = require('./services/AlbumsServices');
const AlbumsValidator = require('./validators/Albums');

const SongsPlugin = require('./api/songs');
const SongsService = require('./services/SongsServices');
const SongsValidator = require('./validators/Songs');

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

  await server.start();
  console.log(`Server running on port: ${server.info.uri}`);
};

init();
