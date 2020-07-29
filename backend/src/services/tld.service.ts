import { Request, Response } from 'express';
import { logger } from '@utils/logger';
import { ITld } from '@common/interfaces';
import { Service } from '@services/Service';
import { getAllTlds } from '@actions/tld.actions';

export class TldService extends Service {
  // /tld
  // /tld?latest
  // /tld?upcoming
  // /tld?after=DD-MM-YYYY
  find = {
    requireAuth: true,
    handler: async (req: Request, res: Response): Promise<void> => {
      try {
        const tlds: ITld[] = await getAllTlds();
        res.json(tlds);
        logger.info('Retrieved all TLDs', { tldCount: tlds.length });
        return;
      } catch (error) {
        res.status(503).end();
        logger.error('Internal error retrieving TLDs', { error });
      }
    },
  };
}
