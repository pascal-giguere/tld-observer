import { Middleware } from '@middlewares/index';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';

export const invalidSignatureMiddleware: Middleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (error.name === 'UnauthorizedError') {
    res.status(403).send();
    logger.error('JWT has an invalid signature', { error });
    return;
  }
  next();
};
