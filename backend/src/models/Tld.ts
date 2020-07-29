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
  createdAt: Date;
  updatedAt: Date;

  constructor(tld: string, launchDate: Date, launchDateConfirmed: boolean, createdAt: Date, updatedAt: Date) {
    this.tld = tld;
    this.launchDate = launchDate;
    this.launchDateConfirmed = launchDateConfirmed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPersistedTld = (persistedTld: PersistedTld): Tld => {
    const { tld, launch_date, launch_date_confirmed, created_at, updated_at } = persistedTld;
    return new Tld(tld, launch_date, launch_date_confirmed, created_at, updated_at);
  };

  toPersistedTld = (): PersistedTld => {
    const { tld, launchDate, launchDateConfirmed, createdAt, updatedAt } = this;
    return {
      tld,
      launch_date: launchDate,
      launch_date_confirmed: launchDateConfirmed,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  };
}
