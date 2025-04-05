// src/middleware/sqlLogger.ts
import { Request, Response, NextFunction } from 'express';
import { createLogger } from '../log';

const sqlLogger = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  // Capture the original res.send function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.send = (body: any) => {
    const result = body; // assuming body contains the result of the query

    // Log the query and result
    createLogger({
      timestamp: new Date().toLocaleString(),
      message: 'SQL Query executed',
      result,
    });

    return originalSend.call(res, body);
  };

  next();
};

export default sqlLogger;
