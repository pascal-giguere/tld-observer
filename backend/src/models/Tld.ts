import moment from 'moment';
import { TldCalendarEvent } from '@utils/ical';

export type PersistedTld = {
  tld: string;
  launch_date: Date;
  launch_date_confirmed: boolean;
  created_at: Date;
  updated_at: Date;
};

export class Tld {
  tld: string;
  launchDate: Date;
  launchDateConfirmed: boolean;

  constructor(tld: string, launchDate: Date, launchDateConfirmed: boolean) {
    this.tld = tld;
    this.launchDate = launchDate;
    this.launchDateConfirmed = launchDateConfirmed;
  }

  static fromPersistedTld = (persistedTld: PersistedTld): Tld => {
    const { tld, launch_date, launch_date_confirmed } = persistedTld;
    return new Tld(tld, launch_date, launch_date_confirmed);
  };

  toPersistedTld = (createdAt: Date, updatedAt: Date): PersistedTld => {
    const { tld, launchDate, launchDateConfirmed } = this;
    return {
      tld,
      launch_date: launchDate,
      launch_date_confirmed: launchDateConfirmed,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  };

  static fromTldCalendarEvent = (tldCalendarEvent: TldCalendarEvent): Tld => {
    const { tld, generalAccessStartDate, sunriseEndDate } = tldCalendarEvent;
    if (generalAccessStartDate) {
      return new Tld(tld, generalAccessStartDate, true);
    }
    if (sunriseEndDate) {
      const estimatedLaunchDate: Date = moment(sunriseEndDate).add(2, 'month').toDate();
      return new Tld(tld, estimatedLaunchDate, false);
    }
    throw Error('TLD calendar event must have a date');
  };
}
