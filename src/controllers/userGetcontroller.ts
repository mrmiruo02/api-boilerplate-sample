import validationInput from "../components/validation.ts";
import { userListModel } from "../model/getUsers.model.ts";
import userGet from "../Persister/getUsers.persister.ts";
import { Request, Response } from "express";

const userGetController = async (req: Request, res: Response): Promise<void> => {

  const usersList = await userGet();

  const parseResult = userListModel.safeParse(usersList);

  validationInput(parseResult); // Handles validation and throws if needed

  res.send(parseResult.data);
};

export default userGetController;
