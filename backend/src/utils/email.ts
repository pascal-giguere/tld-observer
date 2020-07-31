import env from 'env-var';
import mailgun, { Mailgun } from 'mailgun-js';
import { findMembersWithTopicKey } from '@utils/api';
import { logger } from '@utils/logger';
import { IMember } from '@common/interfaces';
import { TopicKey } from '@common/enums';

const apiKey: string = env.get('MAILGUN_KEY').required().asString();
const domain: string = env.get('MAILGUN_DOMAIN').required().asString();

const mailgunClient: Mailgun = new mailgun({ apiKey, domain });

export async function sendLaunchingTldEmails(tld: string): Promise<void> {
  const members: IMember[] = await findMembersWithTopicKey(TopicKey.newTlds);
  for (const member of members) {
    await sendLaunchedTldEmail(member.name, member.email, tld);
  }
  logger.info('Sent launching TLD emails', { tld, memberCount: members.length });
}

export async function sendUpcomingTldEmails(tld: string, launchDate: Date): Promise<void> {
  const members: IMember[] = await findMembersWithTopicKey(TopicKey.upcomingTlds);
  for (const member of members) {
    await sendUpcomingTldEmail(member.name, member.email, tld, launchDate);
  }
  logger.info('Sent upcoming TLD emails', { tld, launchDate, memberCount: members.length });
}

export async function sendWelcomeEmail(memberName: string, memberEmail: string): Promise<void> {
  // TODO
  const emailSubject = 'Welcome to TLD Observer';
  await sendEmail(memberEmail, emailSubject, 'TODO');
}

async function sendLaunchedTldEmail(memberName: string, memberEmail: string, tld: string): Promise<void> {
  // TODO
  const emailSubject = `New '${tld}' TLD is launching today! 🚀`;
  await sendEmail(memberEmail, emailSubject, 'TODO');
}

async function sendUpcomingTldEmail(
  memberName: string,
  memberEmail: string,
  tld: string,
  launchDate: Date
): Promise<void> {
  // TODO
  const emailSubject = `New '${tld}' TLD is launching soon! 🚀`;
  await sendEmail(memberEmail, emailSubject, 'TODO');
}

async function sendEmail(emailAddress: string, emailSubject: string, emailBodyHtml: string): Promise<void> {
  const response: mailgun.messages.SendResponse = await mailgunClient.messages().send({
    from: 'TLD Observer <noreply@tld.observer>',
    to: emailAddress,
    subject: emailSubject,
    html: emailBodyHtml,
  });
  logger.debug('Successfully sent email', { emailAddress, emailSubject, emailBodyHtml, response });
}
