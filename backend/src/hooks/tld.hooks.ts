import { Tld } from '@models/Tld';
import { sendUpcomingTldEmails } from '@utils/email';
import { logger } from '@utils/logger';
import { triggerWebsiteBuild } from '@utils/website';

export function onTldCreated(tld: Tld): void {
  (async () => {
    await triggerWebsiteBuild(`${tld.tld} TLD created`);

    if (tld.launchDateConfirmed && tld.isLaunchDateInFuture()) {
      try {
        await sendUpcomingTldEmails(tld.tld, tld.launchDate);
        logger.info('Sent upcoming TLD emails following TLD creation', { tld });
      } catch (error) {
        logger.error('Failed to send upcoming TLD emails following TLD creation', { tld, error });
      }
    }
  })();
}

export function onTldUpdated(previousTld: Tld, updatedTld: Tld): void {
  if (!previousTld.launchDateConfirmed && updatedTld.launchDateConfirmed) {
    onTldLaunchDateConfirmed(updatedTld);
  }
}

function onTldLaunchDateConfirmed(tld: Tld): void {
  (async () => {
    await triggerWebsiteBuild(`${tld.tld} TLD launch date confirmed`);

    if (tld.isLaunchDateInFuture()) {
      try {
        await sendUpcomingTldEmails(tld.tld, tld.launchDate);
        logger.info('Sent upcoming TLD emails following TLD launch date confirmation', { tld });
      } catch (error) {
        logger.error('Failed to send upcoming TLD emails following TLD launch date confirmation', { tld, error });
      }
    }
  })();
}
