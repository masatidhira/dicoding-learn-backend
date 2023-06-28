/* eslint-disable require-jsdoc */

class SongsHandler {
  constructor(services, validator) {
    this._services = services;
    this._validator = validator;
  }

  async postSongHandler(request, h) {}

  async getSongsHandler(request, h) {}

  async getSongByIdHandler(request, h) {}

  async updateSongByIdHandler(request, h) {}

  async deleteSongByIdHandler(request, h) {}
}

module.exports = SongsHandler;
