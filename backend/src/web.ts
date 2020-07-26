import express, { Express, Request, Response } from 'express';
import env from 'env-var';
import { initServer } from '@utils/server';

const portNumber: number = env.get('PORT').required().asPortNumber();
const app: Express = express();

app.get('/', (req: Request, res: Response): void => {
  res.send('TLD Observer API');
});

app.post(
  '/member',
  async (req: Request, res: Response): Promise<void> => {
    res.send('TODO');
  }
);

(async () => await initServer(app, portNumber))();
