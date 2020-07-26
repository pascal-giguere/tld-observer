import express from 'express';
import env from 'env-var';
import { logger } from '@tools/logger';

const portNumber: number = env.get('PORT').required().asPortNumber();
const app = express();

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('TLD Observer API');
});

app.listen(portNumber, () => logger.info(`TLD Observer API listening at http://localhost:${portNumber}`));
