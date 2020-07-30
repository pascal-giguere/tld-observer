import env from 'env-var';
import ical, { CalendarComponent } from 'ical';
import _ from 'lodash';
import { assertUnreachable, fetchFile } from '@utils/helpers';

const sunriseIcsUrl: string = env.get('SUNRISE_ICS_URL').required().asUrlString();
const generalAccessIcsUrl: string = env.get('GENERAL_ACCESS_ICS_URL').required().asUrlString();

export enum CalendarType {
  sunrise = 'sunrise',
  generalAccess = 'generalAccesss',
}

export class TldCalendarEvent {
  tld: string;
  sunriseEndDate?: Date;
  generalAccessStartDate?: Date;

  constructor(tld: string, sunriseEndDate?: Date, generalAccessStartDate?: Date) {
    this.tld = tld;
    this.sunriseEndDate = sunriseEndDate;
    this.generalAccessStartDate = generalAccessStartDate;
  }

  static fromICalEvent(iCalEvent: CalendarComponent, calendarType: CalendarType): TldCalendarEvent {
    const tld: string = extractTldFromICalEvent(iCalEvent);
    const tldCalEvent = new TldCalendarEvent(tld);
    tldCalEvent.setDateFromComponent(iCalEvent, calendarType);
    return tldCalEvent;
  }

  private setDateFromComponent(calendarComponent: CalendarComponent, calendarType: CalendarType): void {
    switch (calendarType) {
      case CalendarType.sunrise: {
        this.sunriseEndDate = calendarComponent.end;
        return;
      }
      case CalendarType.generalAccess: {
        this.generalAccessStartDate = calendarComponent.start;
        return;
      }
    }
    return assertUnreachable(calendarType);
  }

  static mergeEventsByTld(eventsA: TldCalendarEvent[], eventsB: TldCalendarEvent[]): TldCalendarEvent[] {
    const mergedEventsA: TldCalendarEvent[] = eventsA.map((event: TldCalendarEvent) =>
      _.merge(event, _.find(eventsB, { tld: event.tld }))
    );
    return _.uniqBy([...mergedEventsA, ...eventsB], 'tld');
  }
}

export async function fetchTldCalendarEvents(): Promise<TldCalendarEvent[]> {
  const sunriseTldEvents: TldCalendarEvent[] = await fetchTldCalendarEventsForType(CalendarType.sunrise);
  const generalAccessTldEvents: TldCalendarEvent[] = await fetchTldCalendarEventsForType(CalendarType.generalAccess);
  return TldCalendarEvent.mergeEventsByTld(sunriseTldEvents, generalAccessTldEvents);
}

async function fetchTldCalendarEventsForType(calendarType: CalendarType): Promise<TldCalendarEvent[]> {
  const icsUrl: string = icsUrlForCalendarType(calendarType);
  const icsData: string = await fetchFile(icsUrl);
  const iCalEvents: CalendarComponent[] = getICalEvents(icsData);
  return iCalEvents.map((iCalEvent: CalendarComponent) => TldCalendarEvent.fromICalEvent(iCalEvent, calendarType));
}

export function getICalEvents(icsData: string): CalendarComponent[] {
  return Object.values(ical.parseICS(icsData));
}

export function extractTldFromICalEvent(event: CalendarComponent): string {
  if (!event.summary) {
    throw Error('iCalendar event has no Summary field');
  }
  return extractTldFromSummary(event.summary);
}

export function extractTldFromSummary(summary: string): string {
  const summaryTldRegex: RegExp = /^(?:GA|SR)\ (\.\S*)\ /;
  const matches: string[] | null = summary.match(summaryTldRegex);
  if (!matches || matches.length !== 2) {
    throw Error('Failed to match TLD in summary text');
  }
  return matches[1];
}

function icsUrlForCalendarType(calendarType: CalendarType): string {
  switch (calendarType) {
    case CalendarType.sunrise:
      return sunriseIcsUrl;
    case CalendarType.generalAccess:
      return generalAccessIcsUrl;
  }
  return assertUnreachable(calendarType);
}
