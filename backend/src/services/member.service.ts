import { Express, Request, Response } from 'express';
import { logger } from '@utils/logger';
import { Service } from '@services/index';
import { Member } from '@models/Member';
import { createMember, getAllMembers, getMember } from '@actions/member.actions';
import { areCreateParamsValid, areGetParamsValid } from '@validations/member.validations';

const ENDPOINT = '/member';

export const memberService: Service = (app: Express): void => {
  app.get(
    ENDPOINT,
    async (req: Request, res: Response): Promise<void> => {
      const requestParams: { [key: string]: unknown } = req.params;
      const isFindRequest: boolean = !('id' in requestParams);

      if (isFindRequest) {
        try {
          const members: Member[] = await getAllMembers();
          res.json(members);
          logger.debug('Retrieved all members', { memberCount: members.length });
          return;
        } catch (error) {
          res.status(503).end();
          logger.error('Internal error retrieving members', { error });
        }
      }

      if (!areGetParamsValid(requestParams)) {
        res.status(400).end();
        return;
      }

      try {
        const member: Member = await getMember(requestParams.id);
        res.json(member);
        logger.debug('Retrieved member', { requestParams, member });
        return;
      } catch (error) {
        if (error.name === 'TODO') {
          res.status(404).end();
          logger.warn('Member not found', { requestParams, error });
          return;
        }
        res.status(503).end();
        logger.error('Internal error retrieving member', { requestParams, error });
      }
    }
  );

  app.post(
    ENDPOINT,
    async (req: Request, res: Response): Promise<void> => {
      const requestParams: { [key: string]: unknown } = req.params;

      if (!areCreateParamsValid(requestParams)) {
        res.status(400).end();
        return;
      }

      const { name, email, topicKeys } = requestParams;

      try {
        const member: Member = await createMember(name, email, topicKeys);
        res.json(member);
        logger.info('Created new member', { requestParams, member });
      } catch (error) {
        if (error.name === 'TODO') {
          res.status(400).end();
          logger.warn('Bad request creating member', { requestParams, error });
          return;
        }
        res.status(503).end();
        logger.error('Failed to create member', { requestParams, error });
      }
    }
  );
};
