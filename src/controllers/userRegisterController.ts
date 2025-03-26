import insertUser from '../persisters/insertUsers.Persister.ts';
import validationInput from '../components/validation.ts';
import { userCreateReqModel } from '../model/createUsers.model.ts';
import { Request, Response } from 'express';

/**
 * Register a user in the database with valid credentials
 * @param {Request} req
 * @param {Response} res
 */
const userRegisterController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = validationInput(userCreateReqModel, req.body); // Handles validation and throws if needed

  await insertUser(userData);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'successfully registered user',
    data: userData,
  });
};

export default userRegisterController;
