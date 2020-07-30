import moment from 'moment';
import { Tld } from '@models/Tld';
import {
  findTld,
  findTlds,
  findTldsLaunchingAfterDate,
  findTldsLaunchingBeforeDate,
  findTldsLaunchingBetweenDates,
  insertTld,
  updateTld,
} from '@db/tld.db';
import { onTldCreated, onTldUpdated } from '@hooks/tld.hooks';

export async function getTld(tld: string): Promise<Tld> {
  const foundTld: Tld | undefined = await findTld(tld);
  if (!foundTld) throw Error('TLD not found');
  return foundTld;
}

export async function getAllTlds(): Promise<Tld[]> {
  return findTlds();
}

export async function getTldsLaunchingToday(): Promise<Tld[]> {
  const beginningOfToday = moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY').toDate();
  const endOfToday = moment(beginningOfToday).add(1, 'day').subtract(1, 'ms').toDate();
  return findTldsLaunchingBetweenDates(beginningOfToday, endOfToday);
}

export async function getTldsLaunchingAfterDate(date: Date): Promise<Tld[]> {
  const tlds: Tld[] = await findTldsLaunchingAfterDate(date);
  return sortByLaunchDateAscending(tlds);
}

export async function getLatestTlds(): Promise<Tld[]> {
  const tlds: Tld[] = await findTldsLaunchingBeforeDate(new Date());
  return sortByLaunchDateDescending(tlds);
}

export async function getUpcomingTlds(): Promise<Tld[]> {
  const tlds: Tld[] = await findTldsLaunchingAfterDate(new Date());
  return sortByLaunchDateAscending(tlds);
}

export async function upsertTld(tld: string, launchDate: Date, launchDateConfirmed: boolean): Promise<Tld> {
  const tldObj = new Tld(tld, launchDate, launchDateConfirmed);
  const existingTld: Tld | undefined = await findTld(tld);
  if (existingTld) {
    await updateTld(tldObj);
    onTldUpdated(existingTld, tldObj);
  } else {
    await insertTld(tldObj);
    onTldCreated(tldObj);
  }
  return tldObj;
}

function sortByLaunchDateAscending(tlds: Tld[]): Tld[] {
  return tlds.sort((a: Tld, b: Tld) => a.launchDate.getTime() - b.launchDate.getTime());
}

function sortByLaunchDateDescending(tlds: Tld[]): Tld[] {
  return tlds.sort((a: Tld, b: Tld) => b.launchDate.getTime() - a.launchDate.getTime());
}
