import { Member } from '@models/Member';
import { sendWelcomeEmail } from '@utils/email';
import { logger } from '@utils/logger';

export function onMemberCreated(member: Member): void {
  sendWelcomeEmail(member.id, member.name, member.email)
    .then(() => {
      logger.info('Sent welcome email', { member });
    })
    .catch((error) => {
      logger.error('Failed to send welcome email', { member, error });
    });
}
