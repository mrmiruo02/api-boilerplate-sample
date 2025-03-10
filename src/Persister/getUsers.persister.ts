import { dbConfig } from "../config/db.config.ts";
import { resultModel } from "../model/getUsers.model.ts";

const getUsers = async () => {
  const results = await dbConfig.connection.query<resultModel[]>(
    "SELECT * FROM users"
  );

  return results[0];
};

export default getUsers;
