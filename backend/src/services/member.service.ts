import { Request, Response } from 'express';
import { logger } from '@utils/logger';
import { DbErrorCode } from '@utils/database';
import { IMember } from '@common/interfaces';
import { Service } from '@services/Service';
import {
  getMember,
  getAllMembers,
  getMembersWithTopic,
  createMember,
  removeMember,
  MEMBER_NOT_FOUND_ERROR,
} from '@actions/member.actions';
import {
  areGetParamsValid,
  areFindParamsValid,
  areCreateParamsValid,
  areRemoveParamsValid,
} from '@validations/member.validations';
import { ErrorCode, TopicKey } from '@common/enums';

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
        if (error.message === MEMBER_NOT_FOUND_ERROR) {
          res.status(404).end();
          logger.warn('Member to get not found', { requestParams, error });
          return;
        }
        res.status(503).end();
        logger.error('Internal error retrieving member', { requestParams, error });
      }
    },
  };

  /** Supported queries:
   *  - /member
   *  - /member?topicKey=<key>
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
        let members: IMember[];
        if (typeof requestParams.topicKey === 'string') {
          members = await getMembersWithTopic(requestParams.topicKey as TopicKey);
        } else {
          members = await getAllMembers();
        }
        res.json(members);
        logger.info('Retrieved all members', { memberCount: members.length });
      } catch (error) {
        res.status(503).end();
        logger.error('Internal error retrieving members', { requestParams, error });
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
        logger.error('Internal error creating member', { requestParams, error });
      }
    },
  };

  remove = {
    requireAuth: false,
    handler: async (req: Request, res: Response): Promise<void> => {
      const requestParams: { [key: string]: unknown } = req.params;

      if (!areRemoveParamsValid(requestParams)) {
        res.status(400).end();
        return;
      }

      try {
        await removeMember(requestParams.id);
        res.status(200).end();
        logger.info('Removed member', { requestParams });
        return;
      } catch (error) {
        if (error.message === MEMBER_NOT_FOUND_ERROR) {
          res.status(404).end();
          logger.warn('Member to remove not found', { requestParams, error });
          return;
        }
        res.status(503).end();
        logger.error('Internal error removing member', { requestParams, error });
      }
    },
  };
}
