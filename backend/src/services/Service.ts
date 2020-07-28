import { Express, RequestHandler } from 'express';
import { requireAuthMiddleware } from '@middlewares/requireAuth.middleware';

type ServiceMethod = {
  handler: RequestHandler;
  requireAuth: boolean;
};

export abstract class Service {
  endpoint: string;
  get?: ServiceMethod;
  find?: ServiceMethod;
  create?: ServiceMethod;
  update?: ServiceMethod;
  patch?: ServiceMethod;
  remove?: ServiceMethod;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  init = (app: Express): void => {
    const { endpoint, get, find, create, update, patch, remove } = this;
    Service.initMethod(app, 'get', `${endpoint}/:id`, get);
    Service.initMethod(app, 'get', endpoint, find);
    Service.initMethod(app, 'post', endpoint, create);
    Service.initMethod(app, 'put', `${endpoint}/:id`, update);
    Service.initMethod(app, 'patch', `${endpoint}/:id`, patch);
    Service.initMethod(app, 'delete', `${endpoint}/:id`, remove);
  };

  private static initMethod(app: Express, httpVerb: keyof Express, endpoint: string, method?: ServiceMethod): void {
    if (!method) return;

    if (method.requireAuth) {
      app[httpVerb](endpoint, requireAuthMiddleware, method.handler);
    } else {
      app[httpVerb](endpoint, method.handler);
    }
  }
}
