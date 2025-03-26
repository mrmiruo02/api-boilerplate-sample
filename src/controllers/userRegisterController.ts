import insertUser from '../persisters/insertUsers.Persister.ts';
import validationInput from '../utils/validation.utils.ts';
import { userCreateReqModel } from '../model/createUsers.model.ts';
import { Request, Response } from 'express';
import { encrypt } from '../utils/crypt.util.ts';

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

  const encryptData = {
    name: encrypt(userData.name),
    nickname: encrypt(userData.nickname),
  };

  await insertUser(encryptData);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'successfully registered user',
    data: userData,
  });
};

export default userRegisterController;
