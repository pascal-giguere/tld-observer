import fs from 'fs';
import { CalendarComponent } from 'ical';
import moment from 'moment';
import {
  extractTldFromSummary,
  extractTldFromICalEvent,
  getICalEvents,
  CalendarType,
  TldCalendarEvent,
} from '@utils/ical';

describe('iCalendar helpers', () => {
  it('extracts TLDs from summary text', () => {
    expect(extractTldFromSummary('GA .car (Cars Registry Limited | Uniregistry Inc.)')).toEqual('.car');
    expect(extractTldFromSummary('GA .car ')).toEqual('.car');
    expect(extractTldFromSummary('SR .lol (Uniregistry\\, Corp. | Uniregistry Inc.)')).toEqual('.lol');
    expect(extractTldFromSummary('SR .photography ')).toEqual('.photography');
    expect(extractTldFromSummary('SR .lol .car ')).toEqual('.lol');
    expect(extractTldFromSummary('GA .汽车 ')).toEqual('.汽车');
    expect(() => extractTldFromSummary('GA .car')).toThrow();
    expect(() => extractTldFromSummary('GR .car')).toThrow();
    expect(() => extractTldFromSummary('.car ')).toThrow();
    expect(() => extractTldFromSummary('.car')).toThrow();
    expect(() => extractTldFromSummary('GAA .car ')).toThrow();
    expect(() => extractTldFromSummary('GA GA .car ')).toThrow();
  });

  it('merges events with the same tld', () => {});
});

describe('iCalendar file parsing', () => {
  let sunriseEvents: CalendarComponent[];
  let generalAccessEvents: CalendarComponent[];

  beforeEach(() => {
    const sunriseIcsData: string = fs.readFileSync('test/mocks/sunrise.ics', 'utf-8');
    const generalAccessIcsData: string = fs.readFileSync('test/mocks/generalAccess.ics', 'utf-8');
    sunriseEvents = getICalEvents(sunriseIcsData);
    generalAccessEvents = getICalEvents(generalAccessIcsData);
  });

  it('extracts TLDs from ICS files', () => {
    const EXPECTED_SUNRISE_TLDS = ['.game', '.mom', '.car', '.cars', '.auto', '.lol', '.flowers'];
    const EXPECTED_GENERAL_ACCESS_TLDS = ['.car', '.cars', '.auto', '.lol', '.help', '.diet', '.click'];
    expect(sunriseEvents.map(extractTldFromICalEvent)).toEqual(EXPECTED_SUNRISE_TLDS);
    expect(generalAccessEvents.map(extractTldFromICalEvent)).toEqual(EXPECTED_GENERAL_ACCESS_TLDS);
  });

  it('extracts end dates from Sunrise ICS file', () => {
    const EXPECTED_SUNRISE_END_DATES = [
      '16-05-2016',
      '25-03-2016',
      '12-01-2016',
      '12-01-2016',
      '12-01-2016',
      '31-07-2015',
      '27-03-2015',
    ];
    const sunriseEndDates: Date[] = sunriseEvents.map(
      (iCalEvent: CalendarComponent) => TldCalendarEvent.fromICalEvent(iCalEvent, CalendarType.sunrise).sunriseEndDate
    );
    expect(sunriseEndDates.map((date: Date) => moment(date).format('DD-MM-YYYY'))).toEqual(EXPECTED_SUNRISE_END_DATES);
  });

  it('extracts start dates from General Access ICS file', () => {
    const EXPECTED_GENERAL_ACCESS_START_DATES = [
      '20-01-2016',
      '20-01-2016',
      '20-01-2016',
      '11-08-2015',
      '25-11-2014',
      '25-11-2014',
      '25-11-2014',
    ];
    const generalAccessStartDates: Date[] = generalAccessEvents.map(
      (iCalEvent: CalendarComponent) =>
        TldCalendarEvent.fromICalEvent(iCalEvent, CalendarType.generalAccesss).generalAccessStartDate
    );
    expect(generalAccessStartDates.map((date: Date) => moment(date).format('DD-MM-YYYY'))).toEqual(
      EXPECTED_GENERAL_ACCESS_START_DATES
    );
  });
});
