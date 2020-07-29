import { PgDriver } from 'db-migrate-pg';

const TABLE_NAME = 'topic';
const TOPIC_KEYS = ['newTlds', 'upcomingTlds'];

const SQL_INSERT_QUERY = `INSERT INTO ${TABLE_NAME}(key,created_at) VALUES ${TOPIC_KEYS.map(
  (key: string) => `('${key}','now')`
).join(',')};`;

const SQL_DELETE_QUERY = `DELETE FROM ${TABLE_NAME} WHERE key IN (${TOPIC_KEYS.map((key: string) => `'${key}'`).join(
  ','
)});`;

export function up(db: PgDriver, callback: () => void): void {
  db.runSql(SQL_INSERT_QUERY, callback);
}

export function down(db: PgDriver, callback: () => void): void {
  db.runSql(SQL_DELETE_QUERY, callback);
}
