const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD, DB_SSL_ENABLED } = process.env;

const requiredEnvVars = [DB_HOST, DB_PORT, DB_DATABASE, DB_USER];
const isMissingDbEnvVar = requiredEnvVars.some((envVar) => !envVar);
if (isMissingDbEnvVar) {
  throw Error('Missing required database environment variables');
}

const isLocalHost = ['localhost', '127.0.0.1'].includes(DB_HOST);
if (!isLocalHost && !DB_SSL_ENABLED) {
  throw Error('SSL must be enabled for this database host');
}

const dbMigrateConfig = {
  driver: 'pg',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  ssl: DB_SSL_ENABLED,
};

module.exports = {
  dev: dbMigrateConfig,
  prod: dbMigrateConfig,
};
