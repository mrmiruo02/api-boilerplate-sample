import { dbConfig } from '../config/db.config.ts';
import NoDataFoundError from '../errors/NoDataFoundError.ts';
import {
  SearchResults,
  UserDeleteReqModel,
} from '../model/userDelete.model.ts';

const deleteUserPersister = async (param: UserDeleteReqModel) => {
  const search = 'SELECT * FROM users WHERE id = ?';
  const searchValue = [param.id];
  const [searchRes] = await dbConfig.connection.query<SearchResults[]>(
    search,
    searchValue
  );
  if (searchRes.length === 0) {
    throw new NoDataFoundError([{ message: 'user id not found' }]);
  }
  const query = 'DELETE FROM users WHERE id = ?';
  const values = [param.id];
  await dbConfig.connection.execute(query, values);

  return searchRes;
};

export default deleteUserPersister;
