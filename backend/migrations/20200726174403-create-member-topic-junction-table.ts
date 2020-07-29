import { PgDriver } from 'db-migrate-pg';

const JUNCTION_TABLE_NAME = 'member_topic';
const JUNCTION_FK1 = {
  fkName: 'junction-member-fk',
  keyName: 'member_id',
  refTableName: 'member',
  refKeyName: 'id',
  refKeyType: 'uuid',
};
const JUNCTION_FK2 = {
  fkName: 'junction-topic-fk',
  keyName: 'topic_key',
  refTableName: 'topic',
  refKeyName: 'key',
  refKeyType: 'string',
};

export function up(db: PgDriver, callback: () => void): void {
  db.createTable(
    JUNCTION_TABLE_NAME,
    {
      [JUNCTION_FK1.keyName]: { type: JUNCTION_FK1.refKeyType, notNull: true },
      [JUNCTION_FK2.keyName]: { type: JUNCTION_FK2.refKeyType, notNull: true },
      created_at: { type: 'datetime', notNull: true },
    },
    () => {
      db.addForeignKey(
        JUNCTION_TABLE_NAME,
        JUNCTION_FK1.refTableName,
        JUNCTION_FK1.fkName,
        { [JUNCTION_FK1.keyName]: JUNCTION_FK1.refKeyName },
        {
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
        () => {
          db.addForeignKey(
            JUNCTION_TABLE_NAME,
            JUNCTION_FK2.refTableName,
            JUNCTION_FK2.fkName,
            { [JUNCTION_FK2.keyName]: JUNCTION_FK2.refKeyName },
            {
              onDelete: 'RESTRICT',
              onUpdate: 'CASCADE',
            },
            callback
          );
        }
      );
    }
  );
}

export function down(db: PgDriver, callback: () => void): void {
  db.dropTable(JUNCTION_TABLE_NAME, callback);
}
