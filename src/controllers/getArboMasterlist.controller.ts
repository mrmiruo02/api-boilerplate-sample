import { NextFunction, Request, Response } from 'express';
import { GetArboMasterlistReqModel, getArboMasterlistReqModel } from '../model/request/getArboMasterlistReq.model';
import validationInput from '../utils/validation.utils';
import getArboMasterlistService from '../service/getArboMasterlist.service';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let requestSearch = true;

    if (Object.keys(req.body).length === 0) {
      requestSearch = false;
    }
    const reqParams = validationInput(getArboMasterlistReqModel, req.body) as GetArboMasterlistReqModel;

    const results = await getArboMasterlistService.businessLogic(reqParams, requestSearch);

    res.status(201).json({
      status: 'success',
      code: 200,
      message: 'successfully retrieve user',
      data: results,
    });
  } catch (err: unknown) {
    next(err);
  }
};

const createArboMasterlistController = { controller };

export default createArboMasterlistController;
