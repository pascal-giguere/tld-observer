import { fetchTldCalendarEvents, TldCalendarEvent } from '@utils/ical';
import { Tld } from '@models/Tld';
import { upsertTld } from '@utils/api';
import { logger } from '@utils/logger';

export async function updateTlds(): Promise<void> {
  const tldCalendarEvents: TldCalendarEvent[] = await fetchTldCalendarEvents();
  const tldObjs: Tld[] = tldCalendarEvents.map(Tld.fromTldCalendarEvent);
  for (const tldObj of tldObjs) {
    logger.debug(`Upserting '${tldObj.tld}' TLD...`);
    await upsertTld(tldObj);
  }
}
