import { PgDriver } from 'db-migrate-pg';

const TABLE_NAME = 'topic';

export function up(db: PgDriver, callback: () => void): void {
  db.createTable(
    TABLE_NAME,
    {
      id: { type: 'uuid', primaryKey: true, notNull: true },
      key: { type: 'string', unique: true, notNull: true },
    },
    callback
  );
}

export function down(db: PgDriver, callback: () => void): void {
  db.dropTable(TABLE_NAME, callback);
}
