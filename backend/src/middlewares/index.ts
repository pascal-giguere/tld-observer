import { Express } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';

export type Middleware = (app: Express) => void;

const middlewares: Middleware[] = [authMiddleware];

export function initMiddlewares(app: Express): void {
  middlewares.forEach((middleware: Middleware) => middleware(app));
}
