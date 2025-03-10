import { dbConfig } from "../config/db.config.ts";
import { InputUser } from "../model/createUsers.model.ts";

const insertUser = async (param: InputUser) => {
  const query = "INSERT INTO users (name, nickname) VALUES (?,?)";
  const values = [param.name, param.nickname];
  await dbConfig.connection.execute(query, values);
};

export default insertUser;
