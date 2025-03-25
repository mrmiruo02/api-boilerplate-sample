import validationInput from '../components/validation.ts';
import { userGetReqModel, userGetResModel } from '../model/getUsers.model.ts';
import userGet from '../persisters/getUsers.persister.ts';
import { Request, Response } from 'express';

const userGetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = validationInput(userGetReqModel, req.body); // Handles validation and throws if needed

  const usersList = await userGet(userData);

  validationInput(userGetResModel, usersList); // Handles validation and throws if needed

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'successfuly retrieved users',
    data: usersList,
  });
};

export default userGetController;
