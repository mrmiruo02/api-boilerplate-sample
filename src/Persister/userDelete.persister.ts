import { dbConfig } from "../config/db.config.ts";
import { DeleteUser } from "../model/userDelete.model.ts";

const deleteUserPersister = async (param: DeleteUser) => {
  let query = "DELETE FROM users WHERE id = ?";
  const values = [param.id];
  await dbConfig.connection.execute(query, values);
};

export default deleteUserPersister;
