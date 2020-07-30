import { logger } from '@utils/logger';
import { notifyMembersOfLaunchedTlds } from '@tasks/notifyMembers';

(async () => startWorker())();

async function startWorker(): Promise<void> {
  logger.info('Starting notifier worker...');
  try {
    await notifyMembersOfLaunchedTlds();
    logger.info('Successfully notified members');
  } catch (error) {
    logger.error('Failed to notify members', { error });
  }
  logger.info('Done running notifier worker');
}
