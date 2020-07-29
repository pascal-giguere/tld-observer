import { Express, RequestHandler, ErrorRequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authenticateMiddleware } from '@middlewares/authenticate.middleware';
import { invalidSignatureMiddleware } from '@middlewares/invalidSignature.middleware';

export type Middleware = RequestHandler | ErrorRequestHandler;

const globalMiddlewares: Middleware[] = [cors(), authenticateMiddleware, invalidSignatureMiddleware, bodyParser.json()];

export function initMiddlewares(app: Express): void {
  globalMiddlewares.forEach((middleware: Middleware) => app.use(middleware));
}
