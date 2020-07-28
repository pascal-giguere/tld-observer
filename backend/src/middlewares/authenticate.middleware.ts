import env from 'env-var';
import jwt from 'express-jwt';
import { Middleware } from '@middlewares/index';

export const AUTH_REQUEST_PROPERTY_NAME = 'user';

const secret: string = env.get('JWT_SECRET').required().asString();
const audience: string = env.get('JWT_AUDIENCE').required().asString();
const issuer: string = env.get('JWT_ISSUER').required().asString();

export const authenticateMiddleware: Middleware = jwt({
  secret,
  audience,
  issuer,
  algorithms: ['HS256'],
  credentialsRequired: false,
  requestProperty: AUTH_REQUEST_PROPERTY_NAME,
});
