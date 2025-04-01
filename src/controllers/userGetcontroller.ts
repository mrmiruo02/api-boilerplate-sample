import validationInput from '../utils/validation.utils.ts';
import {
  userGetReqModel,
  UserGetResModel,
  userGetResModel,
} from '../model/getUsers.model.ts';
import userGet from '../persisters/getUsers.persister.ts';
import { Request, Response } from 'express';
import { decrypt } from '../utils/crypt.util.ts';

const userGetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = validationInput(userGetReqModel, req.body); // Handles validation and throws if needed

  const usersList = (await userGet(userData)) as UserGetResModel;

  const decryptData = usersList.map((user) => ({
    id: user.id,
    name: decrypt(user.name),
    nickname: decrypt(user.nickname),
  }));

  validationInput(userGetResModel, decryptData); // Handles validation and throws if needed

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'successfuly retrieved users',
    data: decryptData,
  });
};

export default userGetController;
