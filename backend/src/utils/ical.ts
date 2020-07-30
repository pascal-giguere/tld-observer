import axios from 'axios';
import env from 'env-var';
import ical, { CalendarComponent } from 'ical';

const sunriseIcsUrl: string = env.get('SUNRISE_ICS_URL').required().asUrlString();

export enum CalendarType {
  sunrise = 'sunrise',
  generalAccesss = 'generalAccesss',
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

// TODO refactor
export async function processSunriseCalendar(): Promise<void> {
  const icsData: string = await fetchFile(sunriseIcsUrl);
  const iCalEvents: CalendarComponent[] = getICalEvents(icsData);
  iCalEvents.forEach((event: CalendarComponent) => {
    console.log(event);
  });
}

// TODO move to helpers
async function fetchFile(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}

// TODO refactor
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
      case CalendarType.generalAccesss: {
        this.generalAccessStartDate = calendarComponent.start;
        return;
      }
    }
    throw Error('Unsupported CalendarType');
  }
}
