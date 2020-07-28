import { Express, RequestHandler } from 'express';
import { authenticateMiddleware } from '@middlewares/authenticate.middleware';

export type Middleware = RequestHandler;

const globalMiddlewares: Middleware[] = [authenticateMiddleware];

export function initMiddlewares(app: Express): void {
  globalMiddlewares.forEach((middleware: Middleware) => app.use(middleware));
}
