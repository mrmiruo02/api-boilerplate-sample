import insertUser from "../Persister/insertUsers.Persister.ts";
import validationInput from "../components/validation.ts";
import { inputUser, InputUser } from "../model/createUsers.model.ts";
import { Request, Response } from "express";

/**
 * Register a user in the database with valid credentials
 * @param {Request<{}, {}, InputUser>} req 
 * @param {Response} res 
 */
const userRegisterController = async (
  req: Request<{}, {}, InputUser>,
  res: Response
): Promise<void> => {
  const parseResult = inputUser.safeParse(req.body);

  validationInput(parseResult); // Handles validation and throws if needed

  const userData = parseResult.data!;

  await insertUser(userData);

  res.status(200).json({
    message: "successfully registered user",
    data: userData
  });
};

export default userRegisterController;
