import validationInput from '../utils/validation.utils';
import { DeleteArboMasterlistReqModel } from '../model/request/deleteArboMasterlistReq.model';
import deleteUserPersister from '../persisters/deleteArboMasterlist.persisters';
import { CryptDeleteArboMasterlistModel } from '../model/crypt/deleteArboMasterlistCrypt.model';
import { deleteArboMasterlistResModel } from '../model/response/deleteArboMasterlistRes.model';

const businessLogic = async (req: DeleteArboMasterlistReqModel) => {
  const encryptData = req.map((item) => ({
    id: item.id,
  }));

  const deletedMasterlist = (await deleteUserPersister(encryptData)) as unknown as CryptDeleteArboMasterlistModel[];

  const resultId = deletedMasterlist.map((masterlist) => ({
    id: masterlist.id,
  }));

  validationInput(deleteArboMasterlistResModel, resultId);

  return resultId;
};

const deleteArboMasterlistService = { businessLogic };

export default deleteArboMasterlistService;
