import { Request, Response } from 'express';
import { logger } from '@utils/logger';
import { DbErrorCode } from '@utils/database';
import { IMember } from '@common/interfaces';
import { Service } from '@services/Service';
import { createMember, getAllMembers, getMember } from '@actions/member.actions';
import { areCreateParamsValid, areGetParamsValid } from '@validations/member.validations';
import { ErrorCode } from '@common/enums';

export class MemberService extends Service {
  get = {
    requireAuth: true,
    handler: async (req: Request, res: Response): Promise<void> => {
      const requestParams: { [key: string]: unknown } = req.params;

      if (!areGetParamsValid(requestParams)) {
        res.status(400).end();
        return;
      }

      try {
        const member: IMember = await getMember(requestParams.id);
        res.json(member);
        logger.info('Retrieved member', { requestParams, member });
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
    },
  };

  find = {
    requireAuth: true,
    handler: async (req: Request, res: Response): Promise<void> => {
      try {
        const members: IMember[] = await getAllMembers();
        res.json(members);
        logger.info('Retrieved all members', { memberCount: members.length });
        return;
      } catch (error) {
        res.status(503).end();
        logger.error('Internal error retrieving members', { error });
      }
    },
  };

  create = {
    requireAuth: false,
    handler: async (req: Request, res: Response): Promise<void> => {
      const requestParams: { [key: string]: unknown } = req.body;

      if (!areCreateParamsValid(requestParams)) {
        res.status(400).json({ errorCode: ErrorCode.invalidData });
        return;
      }

      const { name, email, topicKeys } = requestParams;

      try {
        const member: IMember = await createMember(name, email, topicKeys);
        res.json(member);
        logger.info('Created new member', { requestParams, member });
      } catch (error) {
        if (error.code === DbErrorCode.UniqueConstraint) {
          res.status(400).json({ errorCode: ErrorCode.memberAlreadyExists });
          logger.warn('A member with this email already exists', { requestParams, error });
          return;
        }
        res.status(503).json({ errorCode: ErrorCode.unknownError });
        logger.error('Failed to create member', { requestParams, error });
      }
    },
  };
}
