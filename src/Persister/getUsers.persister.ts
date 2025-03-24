import { dbConfig } from "../config/db.config.ts";
import NoDataFoundError from "../errors/NoDataFoundError.ts";
import { resultModel, UserReqModel } from "../model/getUsers.model.ts";

const getUsers = async (params: UserReqModel) => {
  if (!params.id) {
    const [res] = await dbConfig.connection.query<resultModel[]>(
      "SELECT * FROM users"
    );

    return res;
  } else {
    const query = "SELECT * FROM users WHERE id = ?";
    const input = [params.id];

    const [res] = await dbConfig.connection.execute<resultModel[]>(query, input);

    if (res.length === 0) {
      throw new NoDataFoundError([{ message: "user id not found" }])
    }

    return res;
  }
};

export default getUsers;
