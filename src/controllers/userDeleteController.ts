import { userDeleteReqModel, UserDeleteResModel } from '../model/userDelete.model.ts';
import { Request, Response } from 'express';
import deleteUserPersister from '../persisters/userDelete.persister.ts';
import validationInput from '../utils/validation.utils.ts';
import { decrypt } from '../utils/crypt.util.ts';

const userDeleteController = async (req: Request, res: Response) => {
  const userData = validationInput(userDeleteReqModel, req.body); // Handles validation and throws if needed

  const deletedUser = await deleteUserPersister(userData);

  const decryptData = deletedUser.map((user: UserDeleteResModel) => ({
    id: user.id,
    name: decrypt(user.name),
    nickname: decrypt(user.nickname),
  }));

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'successfully deleted user',
    data: decryptData,
  });
};

export default userDeleteController;
