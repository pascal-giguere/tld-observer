import { Middleware } from '@middlewares/index';
import { Request, Response, NextFunction } from 'express';
import { AUTH_REQUEST_PROPERTY_NAME } from '@middlewares/authenticate.middleware';
import { logger } from '@utils/logger';

export const requireAuthMiddleware: Middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (AUTH_REQUEST_PROPERTY_NAME in req) {
    next();
    logger.info('Request was allowed to access protected route', { req });
    return;
  }
  res.status(403).end();
  logger.warn('Request was forbidden from accessing protected route', { req });
};
