import dayjs from 'dayjs';

export function formatDate(date: Date): string {
  return dayjs(date).format('MMMM D YYYY').toLowerCase();
}
