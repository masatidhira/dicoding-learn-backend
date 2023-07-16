/* eslint-disable object-curly-spacing */
import SongPayloadSchema from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

const SongValidator = {
  validateSongPayload: (payload) => {
    const result = SongPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

export default SongValidator;
