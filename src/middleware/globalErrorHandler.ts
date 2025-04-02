import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/customError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err); // Pass to default Express error handler if headers are sent
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }
  // Default error response for unexpected errors
  return res.status(500).json({
    code: 500,
    status: 'error',
    error: err.message,
  });
};

export default errorHandler;
