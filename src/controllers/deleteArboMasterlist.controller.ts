import { Request, Response } from 'express';
import validationInput from '../utils/validation.utils';
import { deleteArboMasterlistReqModel } from '../model/request/deleteArboMasterlistReq.model';
import deleteUserPersister from '../persisters/deleteArboMasterlist.persisters';
import { CryptDeleteArboMasterlistModel } from '../model/crypt/deleteArboMasterlistCrypt.model';
import { deleteArboMasterlistResModel } from '../model/response/deleteArboMasterlistRes.model';

const userDeleteController = async (req: Request, res: Response) => {
  // Handles validation and throws if needed
  const masterlistReq = validationInput(deleteArboMasterlistReqModel, req.body);

  const encryptData = {
    id: masterlistReq.id,
  };

  const deletedMasterlist = (await deleteUserPersister(encryptData)) as unknown as CryptDeleteArboMasterlistModel[];

  const resultId = deletedMasterlist.map((masterlist) => ({
    id: masterlist.id,
  }));

  validationInput(deleteArboMasterlistResModel, resultId);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'successfully deleted masterlist data',
    data: resultId,
  });
};

export default userDeleteController;
