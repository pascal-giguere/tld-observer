import { fetchTldCalendarEvents } from '@utils/ical';

console.log('Hello world, worker!');

async function startWorker(): Promise<void> {
  const tldEvents = await fetchTldCalendarEvents();
  console.log(tldEvents);
}

(async () => startWorker())();
