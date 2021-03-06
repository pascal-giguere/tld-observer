import { Request, Response } from 'express';
import moment from 'moment';
import { logger } from '@utils/logger';
import { Service } from '@services/Service';
import {
  getAllTlds,
  getLatestTlds,
  getTldsLaunchingAfterDate,
  getTldsLaunchingToday,
  getUpcomingTlds,
  upsertTld,
} from '@actions/tld.actions';
import { areFindParamsValid, areCreateParamsValid } from '@validations/tld.validations';
import { Tld } from '@models/Tld';

export class TldService extends Service {
  /** Supported queries:
   *  - /tld
   *  - /tld?latest
   *  - /tld?upcoming
   *  - /tld?launchingToday
   *  - /tld?launchingAfter=<DD-MM-YYYY>
   */
  find = {
    requireAuth: true,
    handler: async (req: Request, res: Response): Promise<void> => {
      const requestParams: { [key: string]: unknown } = req.query;

      if (!areFindParamsValid(requestParams)) {
        res.status(400).end();
        return;
      }

      try {
        let tlds: Tld[];
        if (typeof requestParams.latest === 'string') {
          tlds = await getLatestTlds();
        } else if (typeof requestParams.upcoming === 'string') {
          tlds = await getUpcomingTlds();
        } else if (typeof requestParams.launchingToday === 'string') {
          tlds = await getTldsLaunchingToday();
        } else if (typeof requestParams.launchingAfter === 'string') {
          const date: Date = moment(requestParams.launchingAfter, 'DD-MM-YYYY').toDate();
          tlds = await getTldsLaunchingAfterDate(date);
        } else {
          tlds = await getAllTlds();
        }
        res.json(tlds);
        logger.info('Retrieved TLDs', { tldCount: tlds.length });
      } catch (error) {
        res.status(503).end();
        logger.error('Internal error retrieving TLDs', { requestParams, error });
      }
    },
  };

  create = {
    requireAuth: true,
    handler: async (req: Request, res: Response): Promise<void> => {
      const requestParams: { [key: string]: unknown } = req.body;

      if (!areCreateParamsValid(requestParams)) {
        res.status(400).end();
        return;
      }

      const { tld, launchDate, launchDateConfirmed } = requestParams;

      try {
        const tldObj: Tld = await upsertTld(tld, new Date(launchDate), launchDateConfirmed);
        res.json(tldObj);
        logger.info('Upserted TLD', { tldObj });
      } catch (error) {
        res.status(503).end();
        logger.error('Internal error upserting TLD', { requestParams, error });
      }
    },
  };
}
