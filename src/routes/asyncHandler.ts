import { Request, Response, NextFunction } from "express";

// Wrapper function for async error handling
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
    (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next); // Automatically catches errors and forwards them
    };

export default asyncHandler;