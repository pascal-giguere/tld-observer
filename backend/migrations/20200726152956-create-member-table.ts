import { PgDriver } from 'db-migrate-pg';

const TABLE_NAME = 'member';

export function up(db: PgDriver, callback: () => void): void {
  db.createTable(
    TABLE_NAME,
    {
      id: { type: 'uuid', primaryKey: true, notNull: true },
      email: { type: 'string', unique: true, notNull: true },
      name: { type: 'string', notNull: true },
    },
    callback
  );
}

export function down(db: PgDriver, callback: () => void): void {
  db.dropTable(TABLE_NAME, callback);
}
