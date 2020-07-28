import { v4 as uuidV4 } from 'uuid';
import { Member } from '@models/Member';
import { Topic, topicsFromKeys } from '@models/Topic';
import { findPersistedMember, findPersistedMembers, persistMember } from '@db/member.db';

export async function getMember(memberId: string): Promise<Member> {
  return findPersistedMember(memberId);
}

export async function getAllMembers(): Promise<Member[]> {
  return findPersistedMembers();
}

export async function getMembersForTopic(topic: Topic): Promise<Member[]> {
  return findPersistedMembers(topic.key);
}

export async function createMember(name: string, email: string, topicKeys: string[]): Promise<Member> {
  const id: string = uuidV4();
  const member: Member = { id, name, email, topics: topicsFromKeys(topicKeys) };
  await persistMember(member);
  return member;
}
