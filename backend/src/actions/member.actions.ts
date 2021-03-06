import { v4 as uuidV4 } from 'uuid';
import { Member } from '@models/Member';
import { Topic } from '@models/Topic';
import { TopicKey } from '@common/enums';
import {
  findMember,
  findMembers,
  findMembersWithTopic,
  insertMember,
  destroyMember,
  destroyMemberTopics,
} from '@db/member.db';
import { onMemberCreated } from '@hooks/member.hooks';

export const MEMBER_NOT_FOUND_ERROR = 'Member not found';

export async function getMember(memberId: string): Promise<Member> {
  const member: Member | undefined = await findMember(memberId);
  if (!member) throw Error(MEMBER_NOT_FOUND_ERROR);
  return member;
}

export async function getAllMembers(): Promise<Member[]> {
  return findMembers();
}

export async function getMembersWithTopic(topicKey: TopicKey): Promise<Member[]> {
  return findMembersWithTopic(topicKey);
}

export async function createMember(name: string, email: string, topicKeys: TopicKey[]): Promise<Member> {
  const id: string = uuidV4();
  const member = new Member(id, name, email, Topic.fromKeys(topicKeys));
  await insertMember(member);
  onMemberCreated(member);
  return member;
}

export async function removeMember(id: string): Promise<void> {
  await destroyMemberTopics(id);
  const wasDestroyed: boolean = await destroyMember(id);
  if (!wasDestroyed) throw Error(MEMBER_NOT_FOUND_ERROR);
}
