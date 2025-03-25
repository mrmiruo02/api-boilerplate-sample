import validationInput from "../components/validation.ts";
import { userGetReqModel, userGetResModel } from "../model/getUsers.model.ts";
import userGet from "../Persister/getUsers.persister.ts";
import { Request, Response } from "express";

const userGetController = async (req: Request, res: Response): Promise<void> => {
  // const parseReqResult = userGetReqModel.safeParse(req.body);

  const userData = validationInput(userGetReqModel, req.body); // Handles validation and throws if needed

  // const userData = parseReqResult.data!;

  const usersList = await userGet(userData);

  // const parseResult = userGetResModel.safeParse(usersList);

  validationInput(userGetResModel, usersList); // Handles validation and throws if needed

  res.status(200).json({
    status: "success",
    code: 200,
    message: "successfuly retrieved users",
    data: usersList
  });
};

export default userGetController;
