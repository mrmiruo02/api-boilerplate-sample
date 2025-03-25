import { dbConfig } from "../config/db.config.ts";
import { UserCreateReqModel } from "../model/createUsers.model.ts";

const insertUser = async (param: UserCreateReqModel) => {
  const query = "INSERT INTO users (name, nickname) VALUES (?,?)";
  const values = [param.name, param.nickname];
  await dbConfig.connection.execute(query, values);
};

export default insertUser;
