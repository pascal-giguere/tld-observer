import { ITld } from '@common/interfaces';
import { findTldsLaunchingToday } from '@utils/api';
import { sendLaunchingTldEmails } from '@utils/email';
import { logger } from '@utils/logger';

export async function notifyMembersOfLaunchingTlds(): Promise<void> {
  const tldsLaunchingToday: ITld[] = await findTldsLaunchingToday();

  if (!tldsLaunchingToday.length) {
    logger.info('No TLDs launching today');
    return;
  }

  for (const tldLaunchingToday of tldsLaunchingToday) {
    if (!tldLaunchingToday.launchDateConfirmed) {
      logger.warning('TLD launch date unconfirmed, skipping.', { tldLaunchingToday });
      continue;
    }

    try {
      await sendLaunchingTldEmails(tldLaunchingToday.tld);
      logger.info('Sent launching TLD emails', { tldLaunchingToday });
    } catch (error) {
      logger.error('Failed to send launching TLD emails', { tldLaunchingToday, error });
    }
  }
}
