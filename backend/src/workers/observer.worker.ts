import { logger } from '@utils/logger';
import { updateTlds } from '../tasks/updateTlds';

(async () => startWorker())();

async function startWorker(): Promise<void> {
  logger.info('Starting observer worker...');
  try {
    await updateTlds();
    logger.info('Successfully updated TLDs');
  } catch (error) {
    logger.error('Failed to update TLDs', { error });
  }
  logger.info('Done running observer worker');
}
