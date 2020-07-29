import { PgDriver } from 'db-migrate-pg';

const TABLE_NAME = 'topic';

export function up(db: PgDriver, callback: () => void): void {
  db.createTable(
    TABLE_NAME,
    {
      key: { type: 'string', primaryKey: true, notNull: true },
      created_at: { type: 'timestamp', notNull: true },
    },
    callback
  );
}

export function down(db: PgDriver, callback: () => void): void {
  db.dropTable(TABLE_NAME, callback);
}
