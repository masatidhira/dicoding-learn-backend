/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  catchError(error, h) {
    if (error instanceof ClientError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    const response = h.response({
      status: 'error',
      message: 'Server Error',
    });
    response.code(500);
    return response;
  }

  async postAlbumHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);

      const { name, year } = request.payload;

      const albumId = await this._service.addAlbum({ name, year });

      const response = h.response({
        status: 'success',
        message: 'Menambahkan Album',
        data: {
          albumId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this.catchError(error, h);
    }
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this._service.getAlbumById(id);
      return {
        status: 'success',
        data: { album },
      };
    } catch (error) {
      return this.catchError(error, h);
    }
  }

  async updateAlbumByIdHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);

      const { id } = request.params;

      await this._service.updateAlbumById(id, request.payload);

      return {
        status: 'success',
        message: `Berhasil mengubah Album dengan id: ${id}`,
      };
    } catch (error) {
      return this.catchError(error, h);
    }
  }

  async deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteAlbumById(id);

      return {
        status: 'success',
        message: `Berhasil menghapus Album dengan id: ${id}`,
      };
    } catch (error) {
      return this.catchError(error, h);
    }
  }
}

module.exports = AlbumsHandler;
