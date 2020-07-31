import * as yup from 'yup';
import moment from 'moment';
import { logger } from '@utils/logger';

interface FindTldsParams {
  latest?: '';
  upcoming?: '';
  launchingToday?: '';
  launchingAfter?: string;
}

interface CreateTldParams {
  tld: string;
  launchDate: string;
  launchDateConfirmed: boolean;
}

const findParamsSchema: yup.ObjectSchema = yup
  .object()
  .shape({
    latest: yup.string().equals(['']),
    upcoming: yup.string().equals(['']),
    launchingToday: yup.string().equals(['']),
    launchingAfter: yup
      .string()
      .test('valid_date', 'Date must be valid and in the DD-MM-YYYY format', (date: string | undefined) =>
        date ? moment(date, 'DD-MM-YYYY').isValid() : true
      ),
  })
  .test('valid_param_count', 'Cannot use multiple FIND parameters', (obj) => {
    return Object.keys(obj).length <= 1;
  });

const createParamsSchema: yup.ObjectSchema = yup.object().shape({
  tld: yup.string().required(),
  launchDate: yup.date().required(),
  launchDateConfirmed: yup.boolean().required(),
});

export function areFindParamsValid(requestParams: unknown): requestParams is FindTldsParams {
  try {
    findParamsSchema.validateSync(requestParams);
    return true;
  } catch (error) {
    logger.warn('Invalid request params to find TLDs', { requestParams, error });
    return false;
  }
}

export function areCreateParamsValid(requestParams: unknown): requestParams is CreateTldParams {
  try {
    createParamsSchema.validateSync(requestParams);
    return true;
  } catch (error) {
    logger.warn('Invalid request params to create TLD', { requestParams, error });
    return false;
  }
}
