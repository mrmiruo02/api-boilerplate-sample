import NoDataFoundError from '../errors/NoDataFoundError.ts';
import { UserDeleteReqModel } from '../model/userDelete.model.ts';
import DB from './db.service.ts';

const deleteUserPersister = async (param: UserDeleteReqModel) => {
  const search = 'SELECT * FROM users WHERE id = ?';
  const searchValue = [param.id];
  const results = (await DB.execute(search, searchValue)) as [];
  if (results.length === 0) {
    throw new NoDataFoundError([{ message: 'user id not found' }]);
  }
  const query = 'WHERE id = ?';
  const values = [param.id];
  DB.execute(query, values);

  return results;
};

export default deleteUserPersister;
