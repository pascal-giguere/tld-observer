import express, { Express } from 'express';
import env from 'env-var';
import { initMiddlewares } from '@middlewares/index';
import { initServices } from '@services/index';
import { initServer } from '@utils/server';

const portNumber: number = env.get('PORT').required().asPortNumber();

async function initApp(): Promise<void> {
  const app: Express = express();
  initMiddlewares(app);
  initServices(app);
  await initServer(app, portNumber);
}

(async () => initApp())();
