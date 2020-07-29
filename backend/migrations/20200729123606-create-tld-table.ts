import { PgDriver } from 'db-migrate-pg';

const TABLE_NAME = 'tld';

export function up(db: PgDriver, callback: () => void): void {
  db.createTable(
    TABLE_NAME,
    {
      tld: { type: 'string', primaryKey: true, notNull: true },
      launch_date: { type: 'timestamp', notNull: true },
      launch_date_confirmed: { type: 'boolean', notNull: true },
      created_at: { type: 'timestamp', notNull: true },
      updated_at: { type: 'timestamp', notNull: true },
    },
    () => {
      db.addIndex(TABLE_NAME, 'launch_date_index', 'launch_date', callback);
    }
  );
}

export function down(db: PgDriver, callback: () => void): void {
  db.dropTable(TABLE_NAME, callback);
}
