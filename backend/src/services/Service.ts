import { Express, Request, Response } from 'express';

type ServiceMethod = (req: Request, res: Response) => Promise<void>;

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

    get && app.get(`${endpoint}/:id`, get);
    find && app.get(endpoint, find);
    create && app.post(endpoint, create);
    update && app.put(`${endpoint}/:id`, update);
    patch && app.patch(`${endpoint}/:id`, patch);
    remove && app.post(`${endpoint}/:id`, remove);
  };
}
