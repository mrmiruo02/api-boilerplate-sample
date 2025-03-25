import insertUser from "../Persister/insertUsers.Persister.ts";
import validationInput from "../components/validation.ts";
import { userCreateReqModel, UserCreateReqModel } from "../model/createUsers.model.ts";
import { Request, Response } from "express";

/**
 * Register a user in the database with valid credentials
 * @param {Request<{}, {}, UserCreateReqModel>} req 
 * @param {Response} res 
 */
const userRegisterController = async (
  req: Request<{}, {}, UserCreateReqModel>,
  res: Response
): Promise<void> => {
  // const parseResult = userCreateReqModel.safeParse(req.body);

  const userData = validationInput(userCreateReqModel, req.body); // Handles validation and throws if needed

  // const userData = parseResult.data!;

  await insertUser(userData);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "successfully registered user",
    data: userData
  });
};

export default userRegisterController;
