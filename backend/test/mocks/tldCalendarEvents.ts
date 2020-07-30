import moment from 'moment';
import { TldCalendarEvent } from '@utils/ical';

export const sunriseTldEvents: TldCalendarEvent[] = [
  new TldCalendarEvent('.foo', moment('01-01-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.bar', moment('02-01-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.baz', moment('03-01-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.qux', moment('04-01-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.corge', moment('04-01-2020', 'DD-MM-YYYY').toDate()),
];

export const generalAccessTldEvents: TldCalendarEvent[] = [
  new TldCalendarEvent('.foo', undefined, moment('01-02-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.bar', undefined, moment('02-02-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.baz', undefined, moment('03-02-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.grault', undefined, moment('04-02-2020', 'DD-MM-YYYY').toDate()),
];

export const mergedTldEvents: TldCalendarEvent[] = [
  new TldCalendarEvent(
    '.foo',
    moment('01-01-2020', 'DD-MM-YYYY').toDate(),
    moment('01-02-2020', 'DD-MM-YYYY').toDate()
  ),
  new TldCalendarEvent(
    '.bar',
    moment('02-01-2020', 'DD-MM-YYYY').toDate(),
    moment('02-02-2020', 'DD-MM-YYYY').toDate()
  ),
  new TldCalendarEvent(
    '.baz',
    moment('03-01-2020', 'DD-MM-YYYY').toDate(),
    moment('03-02-2020', 'DD-MM-YYYY').toDate()
  ),
  new TldCalendarEvent('.qux', moment('04-01-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.corge', moment('04-01-2020', 'DD-MM-YYYY').toDate()),
  new TldCalendarEvent('.grault', undefined, moment('04-02-2020', 'DD-MM-YYYY').toDate()),
];
