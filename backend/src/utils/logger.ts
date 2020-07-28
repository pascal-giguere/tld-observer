import env from 'env-var';
import winston, { transport as Transport } from 'winston';
import { SumoLogic } from 'winston-sumologic-transport';
import { stringify } from 'flatted';

const sumoLogicCollectorUrl: string | undefined = env.get('SUMOLOGIC_COLLECTOR_URL').asUrlString();
const sumoLogicEnabled: boolean = typeof sumoLogicCollectorUrl !== 'undefined';

const transports: Transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'DD-MM-YYYY H:ss' }),
      winston.format.cli(),
      winston.format.metadata(),
      winston.format.printf((info) => {
        const { timestamp, ...metadata } = info.metadata;
        const formattedMetadata: string = Object.keys(metadata).length
          ? `— Metadata: ${stringify(metadata, null, 2)}`
          : '';
        return `${timestamp} ${info.level} ${info.message} ${formattedMetadata}`;
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
