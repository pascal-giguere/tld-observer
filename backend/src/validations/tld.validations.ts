import * as yup from 'yup';
import moment from 'moment';
import { logger } from '@utils/logger';

interface FindTldsParams {
  latest?: boolean;
  upcoming?: boolean;
  launchingAfter?: string;
}

const findParamsSchema: yup.ObjectSchema = yup
  .object()
  .shape({
    latest: yup.boolean(),
    upcoming: yup.boolean(),
    launchingAfter: yup
      .string()
      .test('valid_date', 'Date must be valid and in the DD-MM-YYYY format', (date: string | undefined) =>
        date ? moment(date, 'DD-MM-YYYY').isValid() : true
      ),
  })
  .test('valid_param_count', 'Cannot use multiple FIND parameters', (obj) => {
    return Object.keys(obj).length <= 1;
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
