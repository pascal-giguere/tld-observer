import { PgDriver } from 'db-migrate-pg';

const TABLE_NAME = 'topic';
const COL_NAME = 'key';
const TOPIC_KEYS = ['newTlds', 'upcomingTlds'];

const SQL_INSERT_QUERY = `INSERT INTO ${TABLE_NAME}(${COL_NAME}) VALUES ${TOPIC_KEYS.map(
  (key: string) => `('${key}')`
).join(',')};`;

const SQL_DELETE_QUERY = `DELETE FROM ${TABLE_NAME} WHERE ${COL_NAME} IN (${TOPIC_KEYS.map(
  (key: string) => `'${key}'`
).join(',')});`;

export function up(db: PgDriver, callback: () => void): void {
  db.runSql(SQL_INSERT_QUERY, callback);
}

export function down(db: PgDriver, callback: () => void): void {
  db.runSql(SQL_DELETE_QUERY, callback);
}
