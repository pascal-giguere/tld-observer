import { processSunriseCalendar } from '@utils/ical';

console.log('Hello world, worker!');

async function startWorker(): Promise<void> {
  await processSunriseCalendar();
}

(async () => startWorker())();
