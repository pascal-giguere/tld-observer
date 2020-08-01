import env from 'env-var';
import axios from 'axios';
import { logger } from '@utils/logger';

const buildHookUrl: string = env.get('BUILD_HOOK_URL').required().asUrlString();

export async function triggerWebsiteBuild(triggerTitle: string) {
  try {
    await axios.post(buildHookUrl, { trigger_title: `API hook: ${triggerTitle}` });
    logger.info('Triggered website build');
  } catch (error) {
    logger.error('Failed to trigger website build', { error });
  }
}
