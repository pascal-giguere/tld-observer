import env from 'env-var';
import ical, { CalendarComponent } from 'ical';
import moment from 'moment';
import _ from 'lodash';
import { assertUnreachable, fetchFile } from '@utils/helpers';
import { logger } from '@utils/logger';
import { isValidDate } from '@validations/types.validations';

const TLD_SUMMARY_CAPTURE_REGEX: RegExp = /^(?:GA|SR|Transliteration \/ Transcription Limited Registration Period|Additional Trademark Limited Registration Period)\ (\.\S*)\ /;
const MIN_EVENT_DATE: Date = moment('01-01-2019', 'DD-MM-YYYY').toDate();
const MAX_EVENT_DATE: Date = moment('01-01-2040', 'DD-MM-YYYY').toDate();

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
        if (!calendarComponent.end) {
          throw Error('Sunrise calendar component has no end date');
        }
        this.sunriseEndDate = calendarComponent.end;
        return;
      }
      case CalendarType.generalAccess: {
        if (!calendarComponent.start) {
          throw Error('General Access calendar component has no start date');
        }
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

  areDatesInValidRange(): boolean {
    const sunriseDateValid: boolean =
      !this.sunriseEndDate || (this.sunriseEndDate && TldCalendarEvent.isDateInValidRange(this.sunriseEndDate));
    const generalAccessDateValid: boolean =
      !this.generalAccessStartDate ||
      (this.generalAccessStartDate && TldCalendarEvent.isDateInValidRange(this.generalAccessStartDate));
    return sunriseDateValid && generalAccessDateValid;
  }

  private static isDateInValidRange(date: Date): boolean {
    return isValidDate(date) && date.getTime() > MIN_EVENT_DATE.getTime() && date.getTime() < MAX_EVENT_DATE.getTime();
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
  return iCalEvents.reduce((parsedEvents: TldCalendarEvent[], iCalEvent: CalendarComponent) => {
    try {
      const tldCalendarEvent = TldCalendarEvent.fromICalEvent(iCalEvent, calendarType);
      if (!tldCalendarEvent.areDatesInValidRange()) {
        logger.debug('iCalendar event has dates not in valid range, skipping.', { tldCalendarEvent });
        return parsedEvents;
      }
      parsedEvents.push(tldCalendarEvent);
    } catch (error) {
      logger.warn('Failed to parse iCalendar event. Skipping.', { iCalEvent, error });
    }
    return parsedEvents;
  }, []);
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
  const matches: string[] | null = summary.match(TLD_SUMMARY_CAPTURE_REGEX);
  if (!matches || matches.length !== 2) {
    throw Error(`Failed to match TLD in summary text: "${summary}"`);
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
