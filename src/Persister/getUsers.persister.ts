import { dbConfig } from "../config/db.config.ts";
import { resultModel } from "../model/getUsers.model.ts";

const getUsers = async () => {
  const res = await dbConfig.connection.query<resultModel[]>(
    "SELECT * FROM users"
  );

  return res[0];
};

export default getUsers;
