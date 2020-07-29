import { v4 as uuidV4 } from 'uuid';
import { Member } from '@models/Member';
import { Topic } from '@models/Topic';
import { TopicKey } from '@common/enums';
import { findMember, findMembers, findMembersForTopic, persistMember } from '@db/member.db';

export async function getMember(memberId: string): Promise<Member> {
  const member: Member | undefined = await findMember(memberId);
  if (!member) throw Error('Member not found');
  return member;
}

export async function getAllMembers(): Promise<Member[]> {
  return findMembers();
}

export async function getMembersForTopic(topic: Topic): Promise<Member[]> {
  return findMembersForTopic(topic.key);
}

export async function createMember(name: string, email: string, topicKeys: TopicKey[]): Promise<Member> {
  const id: string = uuidV4();
  const now = new Date();
  const member = new Member(id, name, email, Topic.fromKeys(topicKeys), now, now);
  await persistMember(member);
  return member;
}
