import { Express, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import { authenticateMiddleware } from '@middlewares/authenticate.middleware';

export type Middleware = RequestHandler;

const globalMiddlewares: Middleware[] = [authenticateMiddleware, bodyParser.json()];

export function initMiddlewares(app: Express): void {
  globalMiddlewares.forEach((middleware: Middleware) => app.use(middleware));
}
