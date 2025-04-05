import { Request, Response } from 'express';
import { CreateArboMasterlistReq, createArboMasterlistReq } from '../model/request/createArboMasterlistReq.model';
import validationInput from '../utils/validation.utils';
import createArboMasterlistService from '../service/createArboMasterlist.service';

const controller = async (req: Request, res: Response) => {
  try {
    const reqParams = validationInput(createArboMasterlistReq, req.body) as CreateArboMasterlistReq;

    await createArboMasterlistService.businessLogic(reqParams);

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'successfully registered user',
      data: reqParams,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};

const createArboMasterlistController = { controller };

export default createArboMasterlistController;
