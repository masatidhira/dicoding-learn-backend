require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const Service = require('./services');
const Validator = require('./validators');

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
    plugin: songs,
    options: {
      service: Service,
      validator: Validator,
    },
  });

  await server.start();
  console.log(`Server running on port: ${server.info.uri}`);
};

init();
