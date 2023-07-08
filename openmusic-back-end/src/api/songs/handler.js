/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
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

  async postSongHandler(request, h) {
    try {
      // TODO Validate Song Payload

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
    } catch (error) {
      return catchError(error, h);
    }
  }

  async getSongsHandler(request, h) {
    try {
      const songs = await this._service.getSongs();
      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      return catchError(error, h);
    }
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: { song },
      };
    } catch (error) {
      return catchError(error, h);
    }
  }

  async updateSongByIdHandler(request, h) {
    try {
      // TODO Validate Song payload

      const { id } = request.params;

      await this._service.updateSongById(id, request.payload);

      return {
        status: 'success',
        message: `Berhasil mengubah lagu dengan id: ${id}`,
      };
    } catch (error) {
      return catchError(error, h);
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteSongById(id);

      return {
        status: 'success',
        message: `Berhasil menghapus Lagu dengan id: ${id}`,
      };
    } catch (error) {
      return catchError(error, h);
    }
  }
}

module.exports = SongsHandler;
