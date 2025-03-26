import { userDeleteReqModel } from '../model/userDelete.model.ts';
import { Request, Response } from 'express';
import deleteUserPersister from '../persisters/userDelete.persister.ts';
import validationInput from '../components/validation.ts';

const userDeleteController = async (req: Request, res: Response) => {
  const userData = validationInput(userDeleteReqModel, req.body); // Handles validation and throws if needed

  const deletedUser = await deleteUserPersister(userData);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'successfully deleted user',
    data: deletedUser,
  });
};

export default userDeleteController;
