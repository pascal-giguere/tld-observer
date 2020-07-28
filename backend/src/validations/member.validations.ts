import * as yup from 'yup';
import { logger } from '@utils/logger';

type GetParams = {
  id: string;
};

type CreateParams = {
  name: string;
  email: string;
  topicKeys: string[];
};

const getParamsSchema: yup.ObjectSchema = yup.object().shape({
  // @ts-ignore uuid() missing from yup typings
  id: yup.string().uuid().required(),
});

const createParamsSchema: yup.ObjectSchema = yup.object().shape({
  name: yup.string().max(99).required(),
  email: yup.string().max(99).email().required(),
  topicKeys: yup.array().of(yup.string()).min(1).required(),
});

export function areGetParamsValid(requestParams: unknown): requestParams is GetParams {
  try {
    getParamsSchema.validateSync(requestParams);
    return true;
  } catch (error) {
    logger.warn('Invalid request params to get member', { requestParams, error });
    return false;
  }
}

export function areCreateParamsValid(requestParams: unknown): requestParams is CreateParams {
  try {
    createParamsSchema.validateSync(requestParams);
    return true;
  } catch (error) {
    logger.warn('Invalid request params to create member', { requestParams, error });
    return false;
  }
}