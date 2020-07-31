import { logger } from '@utils/logger';
import { notifyMembersOfLaunchingTlds } from '@tasks/notifyMembers';

(async () => startWorker())();

async function startWorker(): Promise<void> {
  logger.info('Starting notifier worker...');
  try {
    await notifyMembersOfLaunchingTlds();
    logger.info('Successfully notified members of launching TLDs');
  } catch (error) {
    logger.error('Failed to notify members of launching TLDs', { error });
  }
  logger.info('Done running notifier worker');
}
