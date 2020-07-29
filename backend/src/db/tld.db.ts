import { getDb } from '@utils/database';
import { PersistedTld, Tld } from '@models/Tld';
import { isValidDate } from '@validations/types.validations';

export async function findTlds(): Promise<Tld[]> {
  const persistedTlds: PersistedTld[] = await getDb().tld.find();
  return persistedTlds.map(Tld.fromPersistedTld);
}

export async function findTldsLaunchingBeforeDate(date: Date): Promise<Tld[]> {
  return findTldsLaunchingRelativeToDate(date, '<');
}

export async function findTldsLaunchingAfterDate(date: Date): Promise<Tld[]> {
  return findTldsLaunchingRelativeToDate(date, '>');
}

async function findTldsLaunchingRelativeToDate(date: Date, operator: '<' | '>'): Promise<Tld[]> {
  if (!isValidDate(date)) throw Error('Invalid date');
  const persistedTlds: PersistedTld[] = await getDb().tld.where(`launch_date ${operator} ${date.toISOString()}`);
  return persistedTlds.map(Tld.fromPersistedTld);
}

export async function persistTld(tld: Tld): Promise<void> {
  await getDb().tld.insert(tld.toPersistedTld());
}
