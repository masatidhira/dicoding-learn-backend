/* eslint-disable object-curly-spacing */
import AlbumPayloadSchema from './schema';
import InvariantError from '../../exceptions/InvariantError';

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const result = AlbumPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

export default AlbumValidator;
