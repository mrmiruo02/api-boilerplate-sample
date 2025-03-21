import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/customError";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.errorCode).send({ errors: err.serializeErrors() })
  }
};

export default errorHandler;