import env from 'env-var';
import { Express, RequestHandler } from 'express';
import jwt from 'express-jwt';
import { Middleware } from '@middlewares/index';

const secret: string = env.get('JWT_SECRET').required().asString();
const audience: string = env.get('JWT_AUDIENCE').required().asString();
const issuer: string = env.get('JWT_ISSUER').required().asString();

const handler: RequestHandler = jwt({
  secret,
  audience,
  issuer,
  algorithms: ['HS256'],
  credentialsRequired: false,
});

export const authMiddleware: Middleware = (app: Express): void => {
  app.use(handler);
};
