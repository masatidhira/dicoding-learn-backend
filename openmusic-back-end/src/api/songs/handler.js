/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
import autoBind from 'auto-bind';

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const { title, year, genre, performer, duration, albumId } =
      request.payload;

    const songId = await this._service.addSong({
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });

    const response = h.response({
      status: 'success',
      data: { songId },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    const songs = await this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return {
      status: 'success',
      data: { song },
    };
  }

  async updateSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const { id } = request.params;

    await this._service.updateSongById(id, request.payload);

    return {
      status: 'success',
      message: `Berhasil mengubah lagu dengan id: ${id}`,
    };
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: `Berhasil menghapus Lagu dengan id: ${id}`,
    };
  }
}

export default SongsHandler;
