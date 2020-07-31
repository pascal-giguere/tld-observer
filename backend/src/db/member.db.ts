import { getDb } from '@utils/database';
import { Member, PersistedMember, TopicsJoinedPersistedMember } from '@models/Member';

const memberTopicsJoin = () => ({
  member_topic: {
    type: 'INNER',
    pk: 'id',
    on: { member_id: 'id' },
    omit: true,
    topics: {
      type: 'LEFT OUTER',
      relation: 'topic',
      pk: 'key',
      on: { key: 'member_topic.topic_key' },
      omit: false,
    },
  },
});

export async function findMember(id: string): Promise<Member | undefined> {
  const persistedMember: TopicsJoinedPersistedMember | undefined = (
    await getDb().member.join(memberTopicsJoin()).find({ 'member.id': id })
  )[0];
  return persistedMember ? Member.fromPersistedMember(persistedMember) : undefined;
}

export async function findMembers(): Promise<Member[]> {
  const persistedMembers: TopicsJoinedPersistedMember[] = await getDb().member.join(memberTopicsJoin()).find();
  return persistedMembers.map(Member.fromPersistedMember);
}

export async function findMembersWithTopic(topicKey: string): Promise<Member[]> {
  const persistedMembers: TopicsJoinedPersistedMember[] = await getDb()
    .member.join(memberTopicsJoin())
    .find({ 'member_topic.topic_key': topicKey });
  return persistedMembers.map(Member.fromPersistedMember);
}

export async function insertMember(member: Member): Promise<void> {
  const now = new Date();
  await getDb().member.insert(member.toPersistedMember(now, now));
  await getDb().member_topic.insert(member.toPersistedMemberTopics(now));
}

export async function destroyMember(id: string): Promise<boolean> {
  const destroyedMembers: PersistedMember[] = await getDb().member.destroy({ id });
  return destroyedMembers.length > 0;
}

export async function destroyMemberTopics(memberId: string): Promise<void> {
  await getDb().member_topic.destroy({ member_id: memberId });
}
