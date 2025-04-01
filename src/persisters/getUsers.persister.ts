import NoDataFoundError from '../errors/NoDataFoundError.ts';
import { UserGetReqModel } from '../model/getUsers.model.ts';
import DB from './db.service.ts';

const getUsers = async (params: UserGetReqModel) => {
  const sql = 'SELECT * FROM users';
  if (!params.id) {
    const res = DB.execute(sql);
    return res;
  } else {
    const query = ' WHERE id = ?';
    const input = [params.id];

    const res = (await DB.addConditionQuery(sql, query, input)) as [];

    if (res.length === 0) {
      throw new NoDataFoundError([{ message: 'user id not found' }]);
    }

    return res;
  }
};

export default getUsers;
