/* eslint-disable object-curly-spacing */
/* eslint-disable camelcase */
const mapAlbumsDBToModel = ({ id, name, year, inserted_at, updated_at }) => ({
  id,
  name,
  year,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

export default mapAlbumsDBToModel;
