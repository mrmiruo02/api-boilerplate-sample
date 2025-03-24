import validationInput from "../components/validation.ts";
import { userListModel, userReqModel } from "../model/getUsers.model.ts";
import userGet from "../Persister/getUsers.persister.ts";
import { Request, Response } from "express";

const userGetController = async (req: Request, res: Response): Promise<void> => {
  const parseReqResult = userReqModel.safeParse(req.body);

  validationInput(parseReqResult); // Handles validation and throws if needed

  const userData = parseReqResult.data!;

  const usersList = await userGet(userData);

  const parseResult = userListModel.safeParse(usersList);

  validationInput(parseResult); // Handles validation and throws if needed

  res.status(200).json({
    status: "success",
    code: 200,
    message: "successfuly retrieved users",
    data: parseResult.data
  });
};

export default userGetController;
