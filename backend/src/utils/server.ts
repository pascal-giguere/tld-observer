import { Express } from 'express';
import { logger } from '@utils/logger';
import { initDbConnection } from '@utils/database';

export async function initServer(app: Express, portNumber: number): Promise<void> {
  await initDbConnection();
  await listen(app, portNumber);
}

async function listen(app: Express, portNumber: number): Promise<void> {
  return new Promise((resolve, reject) => {
    app
      .listen(portNumber)
      .once('listening', () => {
        logger.info(`TLD Observer API listening at http://localhost:${portNumber}`);
        resolve();
      })
      .once('error', reject);
  });
}
