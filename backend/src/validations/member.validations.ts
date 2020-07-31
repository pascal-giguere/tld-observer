import * as yup from 'yup';
import { logger } from '@utils/logger';
import { CreateMemberParams } from '@common/interfaces';
import { TopicKey } from '@common/enums';

interface GetMemberParams {
  id: string;
}

interface FindMembersParams {
  topicKey?: TopicKey;
}

const getParamsSchema: yup.ObjectSchema = yup.object().shape({
  // @ts-ignore uuid() missing from yup typings
  id: yup.string().uuid().required(),
});

const findParamsSchema: yup.ObjectSchema = yup.object().shape({
  topicKey: yup.string().oneOf(Object.values(TopicKey), 'Invalid topic key'),
});

const createParamsSchema: yup.ObjectSchema = yup.object().shape({
  name: yup.string().max(99).required(),
  email: yup.string().max(99).email().required(),
  topicKeys: yup
    .array()
    .of(yup.string().oneOf(Object.values(TopicKey), 'Invalid topic keys'))
    .min(1)
    .required(),
});

export function areGetParamsValid(requestParams: unknown): requestParams is GetMemberParams {
  try {
    getParamsSchema.validateSync(requestParams);
    return true;
  } catch (error) {
    logger.warn('Invalid request params to get member', { requestParams, error });
    return false;
  }
}

export function areFindParamsValid(requestParams: unknown): requestParams is FindMembersParams {
  try {
    findParamsSchema.validateSync(requestParams);
    return true;
  } catch (error) {
    logger.warn('Invalid request params to find members', { requestParams, error });
    return false;
  }
}

export function areCreateParamsValid(requestParams: unknown): requestParams is CreateMemberParams {
  try {
    createParamsSchema.validateSync(requestParams);
    return true;
  } catch (error) {
    logger.warn('Invalid request params to create member', { requestParams, error });
    return false;
  }
}

export function areRemoveParamsValid(requestParams: unknown): requestParams is GetMemberParams {
  try {
    getParamsSchema.validateSync(requestParams);
    return true;
  } catch (error) {
    logger.warn('Invalid request params to delete member', { requestParams, error });
    return false;
  }
}
