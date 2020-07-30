import { logger } from '@utils/logger';

(async () => startWorker())();

async function startWorker(): Promise<void> {
  logger.info('Starting notifier worker...');
}
