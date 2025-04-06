import { NextFunction, Request, Response } from 'express';
import { CreateArboMasterlistReq, createArboMasterlistReq } from '../model/request/createArboMasterlistReq.model';
import validationInput from '../utils/validation.utils';
import createArboMasterlistService from '../service/createArboMasterlist.service';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqParams = validationInput(createArboMasterlistReq, req.body) as CreateArboMasterlistReq;

    const results = await createArboMasterlistService.businessLogic(reqParams);

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'successfully registered user',
      data: results,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
};

const createArboMasterlistController = { controller };

export default createArboMasterlistController;
