import { AxiosResponse } from 'axios';
import { apiClient } from '@utils/api';
import { logger } from '@utils/logger';
import { IMember } from '@common/interfaces';

console.log('Hello world, worker!');

async function startWorker(): Promise<void> {
  const response: AxiosResponse<IMember[]> = await apiClient.get('/member');
  logger.info('Worker retrieved members!', { members: response.data });
}

(async () => startWorker())();
