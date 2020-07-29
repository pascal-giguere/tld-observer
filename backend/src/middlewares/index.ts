import { Express, RequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authenticateMiddleware } from '@middlewares/authenticate.middleware';

export type Middleware = RequestHandler;

const globalMiddlewares: Middleware[] = [cors(), authenticateMiddleware, bodyParser.json()];

export function initMiddlewares(app: Express): void {
  globalMiddlewares.forEach((middleware: Middleware) => app.use(middleware));
}
