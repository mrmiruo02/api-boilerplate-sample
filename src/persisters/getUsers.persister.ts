import connection from '../config/db.config.ts';
import NoDataFoundError from '../errors/NoDataFoundError.ts';
import { UserGetReqModel, UserGetResModel } from '../model/getUsers.model.ts';

const getUsers = async (params: UserGetReqModel) => {
  if (!params.id) {
    const [res] = await connection.query<UserGetResModel[]>(
      'SELECT * FROM users'
    );

    return res;
  } else {
    const query = 'SELECT * FROM users WHERE id = ?';
    const input = [params.id];

    const [res] = await connection.execute<UserGetResModel[]>(query, input);

    if (res.length === 0) {
      throw new NoDataFoundError([{ message: 'user id not found' }]);
    }

    return res;
  }
};

export default getUsers;
