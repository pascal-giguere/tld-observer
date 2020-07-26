import env from 'env-var';
import winston, { transport as Transport } from 'winston';
import { SumoLogic } from 'winston-sumologic-transport';

const sumoLogicCollectorUrl: string | undefined = env.get('SUMOLOGIC_COLLECTOR_URL').asUrlString();
const sumoLogicEnabled: boolean = typeof sumoLogicCollectorUrl !== 'undefined';

const transports: Transport[] = [
  new winston.transports.Console({
    format: winston.format.cli(),
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
