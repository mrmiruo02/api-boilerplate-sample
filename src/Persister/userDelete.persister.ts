import { RowDataPacket } from "mysql2";
import { dbConfig } from "../config/db.config.ts";
import NoDataFoundError from "../errors/NoDataFoundError.ts";
import { DeleteUser, searchResults } from "../model/userDelete.model.ts";

const deleteUserPersister = async (param: DeleteUser) => {

  let search = "SELECT * FROM users WHERE id = ?"
  const searchValue = [param.id];
  const [searchRes] = await dbConfig.connection.query<searchResults[]>(search, searchValue);
  if (searchRes.length === 0) {
    throw new NoDataFoundError([{ message: "user id not found" }])
  }
  let query = "DELETE FROM users WHERE id = ?";
  const values = [param.id];
  await dbConfig.connection.execute(query, values);

  return searchRes;
};

export default deleteUserPersister;
