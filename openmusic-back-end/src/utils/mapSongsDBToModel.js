/* eslint-disable object-curly-spacing */
/* eslint-disable camelcase */
const mapSongsDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

export default mapSongsDBToModel;
