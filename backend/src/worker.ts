import { fetchTldCalendarEvents, TldCalendarEvent } from '@utils/ical';

console.log('Hello world, worker!');

async function startWorker(): Promise<void> {
  const tldCalendarEvents: TldCalendarEvent[] = await fetchTldCalendarEvents();
  console.log(tldCalendarEvents);
}

(async () => startWorker())();
