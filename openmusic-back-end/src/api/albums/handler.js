/* eslint-disable require-jsdoc */

class AlbumsHandler {
  constructor(services, validator) {
    this._services = services;
    this._validator = validator;
  }

  async postAlbumHandler(request, h) {}

  async getAlbumByIdHandler(request, h) {}

  async updateAlbumByIdHandler(request, h) {}

  async deleteAlbumByIdHandler(request, h) {}
}

module.exports = AlbumsHandler;
