import { findMembersWithTopicKey } from '@utils/api';
import { logger } from '@utils/logger';
import { IMember } from '@common/interfaces';
import { TopicKey } from '@common/enums';

export async function sendWelcomeEmail(memberName: string, memberEmail: string): Promise<void> {}

export async function sendLaunchedTldEmails(tld: string): Promise<void> {
  const members: IMember[] = await findMembersWithTopicKey(TopicKey.newTlds);
  for (const member of members) {
    await sendLaunchedTldEmail(member.name, member.email, tld);
  }
  logger.info('Sent launched TLD emails', { tld, memberCount: members.length });
}

async function sendLaunchedTldEmail(memberName: string, memberEmail: string, tld: string): Promise<void> {
  // TODO
}

export async function sendUpcomingTldEmails(tld: string, launchDate: Date): Promise<void> {
  const members: IMember[] = await findMembersWithTopicKey(TopicKey.upcomingTlds);
  for (const member of members) {
    await sendUpcomingTldEmail(member.name, member.email, tld, launchDate);
  }
  logger.info('Sent upcoming TLD emails', { tld, launchDate, memberCount: members.length });
}

async function sendUpcomingTldEmail(
  memberName: string,
  memberEmail: string,
  tld: string,
  launchDate: Date
): Promise<void> {
  // TODO
}

async function sendEmail(emailAddress: string, emailTitle: string, emailBodyHtml: string): Promise<void> {}
