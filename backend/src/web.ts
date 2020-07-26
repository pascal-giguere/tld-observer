import express, { Express } from 'express';
import env from 'env-var';
import { initServer } from '@utils/server';

const portNumber: number = env.get('PORT').required().asPortNumber();
const app: Express = express();

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('TLD Observer API');
});

app.post(
  '/member',
  async (req: express.Request, res: express.Response): Promise<void> => {
    res.send('TODO');
  }
);

(async () => await initServer(app, portNumber))();
