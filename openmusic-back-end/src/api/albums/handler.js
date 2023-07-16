/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
import autoBind from 'auto-bind';

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
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
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: { album },
    };
  }

  async updateAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { id } = request.params;

    await this._service.updateAlbumById(id, request.payload);

    return {
      status: 'success',
      message: `Berhasil mengubah Album dengan id: ${id}`,
    };
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: `Berhasil menghapus Album dengan id: ${id}`,
    };
  }
}

export default AlbumsHandler;
