import { Tld } from '@models/Tld';

export function onTldCreated(tld: Tld): void {
  if (tld.launchDateConfirmed) {
    // TODO Notify
  }
}

export function onTldUpdated(previousTld: Tld, updatedTld: Tld): void {
  if (!previousTld.launchDateConfirmed && updatedTld.launchDateConfirmed) {
    // TODO Notify
  }
}
