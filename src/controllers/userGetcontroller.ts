import { userListModel } from "../model/getUsers.model.ts";
import userGet from "../Persister/getUsers.persister.ts";
import { Request, Response } from "express";

const userGetController = async (req: Request, res: Response) => {

  const usersList = await userGet();

  const parseResult = userListModel.safeParse(usersList);

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.format() }); // Return validation errors
  }

  return res.send(parseResult.data);
};

export default userGetController;
