import { Request, Response, NextFunction } from 'express';

// changes
// Wrapper function for async error handling
const asyncHandler =
  (fn: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // Automatically catches errors and forwards them
  };

export default asyncHandler;
