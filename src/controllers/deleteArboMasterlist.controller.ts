import { NextFunction, Request, Response } from 'express';
import validationInput from '../utils/validation.utils';
import {
  DeleteArboMasterlistReqModel,
  deleteArboMasterlistReqModel,
} from '../model/request/deleteArboMasterlistReq.model';
import deleteArboMasterlistService from '../service/deleteArboMasterlist.service';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqParams = validationInput(deleteArboMasterlistReqModel, req.body) as DeleteArboMasterlistReqModel;

    const retults = await deleteArboMasterlistService.businessLogic(reqParams);

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'successfully deleted masterlist data',
      data: retults,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
};

const createArboMasterlistController = { controller };

export default createArboMasterlistController;
