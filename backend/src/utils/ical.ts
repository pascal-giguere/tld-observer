import axios from 'axios';
import env from 'env-var';
import ical, { CalendarComponent, FullCalendar } from 'ical';

const sunriseIcsUrl: string = env.get('SUNRISE_ICS_URL').required().asUrlString();

enum CalendarType {
  sunrise = 'sunrise',
  generalAvailability = 'generalAvailability',
}

export function extractTldFromSummary(summary: string): string {
  const summaryTldRegex: RegExp = /^(?:GA|SR)\ (\.\S*)\ /;
  const matches: string[] | null = summary.match(summaryTldRegex);
  if (!matches || matches.length !== 2) {
    throw Error('Failed to match TLD in summary text');
  }
  return matches[1];
}

export async function processSunriseCalendar(): Promise<void> {
  const calendar: FullCalendar = await fetchCalendar(sunriseIcsUrl);
  console.log(calendar);
  Object.values(calendar).forEach((event: CalendarComponent) => {
    console.log(event);
  });
}

async function fetchCalendar(icsFileUrl: string): Promise<FullCalendar> {
  const icsData: string = await fetchFile(icsFileUrl);
  return ical.parseICS(icsData);
}

async function fetchFile(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}

class TldCalendarEvent {
  tld: string;
  sunriseEndDate?: Date;
  generalAccessStartDate?: Date;

  constructor(tld: string, sunriseEndDate?: Date, generalAccessStartDate?: Date) {
    this.tld = tld;
    this.sunriseEndDate = sunriseEndDate;
    this.generalAccessStartDate = generalAccessStartDate;
  }

  static fromCalendarComponent(calendarComponent: CalendarComponent): TldCalendarEvent {
    return new TldCalendarEvent('TODO');
  }

  private setDateFromComponent(calendarComponent: CalendarComponent): void {
    const calendarType: CalendarType = TldCalendarEvent.findCalendarType(calendarComponent);
    switch (calendarType) {
      case CalendarType.sunrise: {
        this.sunriseEndDate = calendarComponent.end;
        return;
      }
      case CalendarType.generalAvailability: {
        this.generalAccessStartDate = calendarComponent.start;
        return;
      }
    }
  }

  private static findCalendarType(calendarComponent: CalendarComponent): CalendarType {
    // TODO
    return CalendarType.generalAvailability;
  }
}
