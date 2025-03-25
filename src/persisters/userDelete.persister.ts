import { dbConfig } from '../config/db.config.ts';
import NoDataFoundError from '../errors/NoDataFoundError.ts';
import {
  searchResults,
  UserDeleteReqModel,
} from '../model/userDelete.model.ts';

const deleteUserPersister = async (param: UserDeleteReqModel) => {
  let search = 'SELECT * FROM users WHERE id = ?';
  const searchValue = [param.id];
  const [searchRes] = await dbConfig.connection.query<searchResults[]>(
    search,
    searchValue
  );
  if (searchRes.length === 0) {
    throw new NoDataFoundError([{ message: 'user id not found' }]);
  }
  let query = 'DELETE FROM users WHERE id = ?';
  const values = [param.id];
  await dbConfig.connection.execute(query, values);

  return searchRes;
};

export default deleteUserPersister;
