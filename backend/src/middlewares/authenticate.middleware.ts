import env from 'env-var';
import jwt from 'express-jwt';
import { Middleware } from '@middlewares/index';

export const AUTH_REQUEST_PROPERTY = 'jwtUser';

const audience: string = env.get('JWT_AUDIENCE').required().asString();
const issuer: string = env.get('JWT_ISSUER').required().asString();
const secretBase64: string = env.get('JWT_SECRET').required().asString();

export const authenticateMiddleware: Middleware = jwt({
  audience,
  issuer,
  secret: Buffer.from(secretBase64, 'base64'),
  algorithms: ['HS256'],
  credentialsRequired: false,
  requestProperty: AUTH_REQUEST_PROPERTY,
});
