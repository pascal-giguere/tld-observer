import { Tld } from '@models/Tld';
import { findTlds, findTldsLaunchingAfterDate, findTldsLaunchingBeforeDate } from '@db/tld.db';

export async function getAllTlds(): Promise<Tld[]> {
  return findTlds();
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

function sortByLaunchDateAscending(tlds: Tld[]): Tld[] {
  return tlds.sort((a: Tld, b: Tld) => b.launchDate.getTime() - a.launchDate.getTime());
}

function sortByLaunchDateDescending(tlds: Tld[]): Tld[] {
  return tlds.sort((a: Tld, b: Tld) => b.launchDate.getTime() - a.launchDate.getTime());
}
