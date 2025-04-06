import { NextFunction, Request, Response } from 'express';
import validationInput from '../utils/validation.utils';
import {
  UpdateArboMasterlistReqModel,
  updateArboMasterlistReqModel,
} from '../model/request/updateArboMasterlistReq.model';
import updateArboMasterlistService from '../service/updateArboMasterlist.service';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqParams = validationInput(updateArboMasterlistReqModel, req.body) as UpdateArboMasterlistReqModel;

    const result = await updateArboMasterlistService.businessLogic(reqParams);

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'successfully update masterlist',
      details: result,
    });
  } catch (err: unknown) {
    next(err);
  }
};

const createArboMasterlistController = { controller };

export default createArboMasterlistController;
