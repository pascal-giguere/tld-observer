import env from 'env-var';
import winston, { transport as Transport } from 'winston';
import { SumoLogic } from 'winston-sumologic-transport';
import stringify from 'json-stringify-safe';

const sumoLogicCollectorUrl: string | undefined = env.get('SUMOLOGIC_COLLECTOR_URL').asUrlString();
const sumoLogicEnabled: boolean = typeof sumoLogicCollectorUrl !== 'undefined';

const transports: Transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'DD-MM-YYYY H:mm:ss' }),
      winston.format.cli(),
      winston.format.metadata(),
      winston.format.printf((info) => {
        const { timestamp, error, ...metadata } = info.metadata;
        let formattedError = '';
        if (error) {
          const { name, message, stack } = error;
          formattedError = ` — \x1b[31mError: ${stringify({ name, message, stack })}\x1b[0m`;
        }
        const formattedMetadata: string = Object.keys(metadata).length ? ` — Metadata: ${stringify(metadata)}` : '';
        return `${timestamp} ${info.level} ${info.message}${formattedError}${formattedMetadata}`;
      })
    ),
    level: 'debug',
  }),
];

if (sumoLogicEnabled) {
  transports.push(
    new SumoLogic({
      url: sumoLogicCollectorUrl,
      level: 'info',
    })
  );
}

export const logger = winston.createLogger({ transports });

if (sumoLogicEnabled) {
  logger.info('Sumo Logic logging enabled');
}
