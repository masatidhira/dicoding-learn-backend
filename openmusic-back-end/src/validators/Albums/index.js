/* eslint-disable object-curly-spacing */
import AlbumPayloadSchema from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const result = AlbumPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

export default AlbumValidator;
