import { getDb } from '@utils/database';
import { PersistedTld, Tld } from '@models/Tld';
import { isValidDate } from '@validations/types.validations';

export async function findTld(tld: string): Promise<Tld | undefined> {
  const persistedTld: PersistedTld | undefined = await getDb().tld.findOne({ tld });
  return persistedTld ? Tld.fromPersistedTld(persistedTld) : undefined;
}

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
  const persistedTlds: PersistedTld[] = await getDb().tld.where(`launch_date ${operator} '${date.toISOString()}'`);
  return persistedTlds.map(Tld.fromPersistedTld);
}

export async function insertTld(tldObj: Tld): Promise<void> {
  const now = new Date();
  await getDb().tld.insert(tldObj.toPersistedTld(now, now));
}

export async function updateTld(tldObj: Tld): Promise<void> {
  const now = new Date();
  const persistedTld: PersistedTld = tldObj.toPersistedTld(now, now);
  const { tld, created_at, ...columnsToUpdate } = persistedTld;
  await getDb().tld.update(tld, columnsToUpdate);
}
