import env from 'env-var';
import massive, { Database, ConnectionInfo } from 'massive';
import { logger } from '@utils/logger';

const host: string = env.get('DB_HOST').required().asString();
const port: number = env.get('DB_PORT').required().asPortNumber();
const database: string = env.get('DB_DATABASE').required().asString();
const user: string = env.get('DB_USER').required().asString();
const password: string | undefined = env.get('DB_PASSWORD').asString();
const ssl: boolean = env.get('DB_SSL_ENABLED').asBool() ?? false;

const isLocalHost: boolean = ['localhost', '127.0.0.1'].includes(host);
if (!isLocalHost && !ssl) {
  throw Error('SSL must be enabled for this database host');
}

const dbUrl: string = `postgresql://${host}:${port}/${database}`;
const connectionInfo: ConnectionInfo = { host, port, database, user, password, ssl };

let massiveDb: Database | undefined;

export async function initDbConnection(): Promise<void> {
  try {
    massiveDb = await massive(connectionInfo);
    logger.info(`Connected to PostgreSQL database at ${dbUrl}`);
  } catch (error) {
    logger.error(`Failed to connect to PostgreSQL database at ${dbUrl}: ${JSON.stringify(error)}`);
  }
}

export function getDb(): Database {
  if (typeof massiveDb === 'undefined') {
    throw Error('Database connection not initialized');
  }
  return massiveDb;
}
