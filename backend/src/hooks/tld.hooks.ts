import { Tld } from '@models/Tld';
import { sendUpcomingTldEmails } from '@utils/email';
import { logger } from '@utils/logger';

export function onTldCreated(tld: Tld): void {
  if (tld.launchDateConfirmed && tld.isLaunchDateInFuture()) {
    sendUpcomingTldEmails(tld.tld, tld.launchDate)
      .then(() => {
        logger.info('Sent upcoming TLD emails following TLD creation', { tld });
      })
      .catch((error) => {
        logger.error('Failed to send upcoming TLD emails following TLD creation', { tld, error });
      });
  }
}

export function onTldUpdated(previousTld: Tld, updatedTld: Tld): void {
  if (!previousTld.launchDateConfirmed && updatedTld.launchDateConfirmed) {
    onTldLaunchDateConfirmed(updatedTld);
  }
}

function onTldLaunchDateConfirmed(tld: Tld): void {
  if (tld.isLaunchDateInFuture()) {
    sendUpcomingTldEmails(tld.tld, tld.launchDate)
      .then(() => {
        logger.info('Sent upcoming TLD emails following TLD launch date confirmation', { tld });
      })
      .catch((error) => {
        logger.error('Failed to send upcoming TLD emails following TLD launch date confirmation', { tld, error });
      });
  }
}
