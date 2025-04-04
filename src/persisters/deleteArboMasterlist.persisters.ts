import NoDataFoundError from '../errors/NoDataFoundError.ts';
import { CryptDeleteArboMasterlistModel } from '../model/crypt/deleteArboMasterlistCrypt.model.ts';
import { DeleteArboMasterlistResModel } from '../model/response/deleteArboMasterlistRes.model.ts';
import DB from './db.service.ts';

const deleteUserPersister = async (param: CryptDeleteArboMasterlistModel) => {
  const searchQuery = `
  SELECT id from arbo_masterlist WHERE id = ?`;

  const deleteValue = [param.id];

  const searchResults = (await DB.execute(searchQuery, deleteValue)) as unknown as DeleteArboMasterlistResModel[];

  if (searchResults.length === 0) {
    throw new NoDataFoundError([{ message: 'data not found' }]);
  }
  const deleteId = [];
  for (const data of searchResults) {
    deleteId.push(data.id);
  }
  const placeHolders = deleteId.map(() => '?').join(',');
  const deleteQuery = `DELETE FROM arbo_masterlist WHERE
  id IN (${placeHolders})
  `;
  await DB.execute(deleteQuery, deleteId);

  return searchResults;
};

export default deleteUserPersister;
