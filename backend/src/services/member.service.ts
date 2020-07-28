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
    async (req: Request, res: Response): Promise<Member | Member[] | void> => {
      const isFindRequest: boolean = typeof req.params.id === 'undefined';
      if (isFindRequest) {
        return getAllMembers();
      }

      if (!areGetParamsValid(req.params)) {
        throw Error('Invalid params');
      }
      try {
        return getMember(req.params.id);
      } catch (error) {
        res.status(404).end();
        logger.error('Member not found', { memberId: req.params.id, error });
      }
    }
  );

  app.post(
    ENDPOINT,
    async (req: Request, res: Response): Promise<void> => {
      if (!areCreateParamsValid(req.params)) {
        throw Error('Invalid params');
      }
      const { name, email, topicKeys } = req.params;
      try {
        const member: Member = await createMember(name, email, topicKeys);
        res.send(member);
      } catch (error) {
        res.status(503).end();
        logger.error('Failed to create member', { name, email, topicKeys, error });
      }
    }
  );
};
