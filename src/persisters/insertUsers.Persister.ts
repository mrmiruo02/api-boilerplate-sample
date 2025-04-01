import { UserCreateReqModel } from '../model/createUsers.model.ts';
import DB from './db.service.ts';

const insertUser = async (param: UserCreateReqModel) => {
  const query = 'INSERT INTO users (name, nickname) VALUES (?,?)';
  const values = [param.name, param.nickname];
  await DB.execute(query, values);
};

export default insertUser;
