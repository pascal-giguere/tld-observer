import { getDb } from '@utils/database';
import { Member } from '@models/Member';

const TOPIC_KEYS_JOINED_QUERY = {
  member_topic: {
    type: 'INNER',
    pk: 'id',
    on: { memberId: 'id' },
    omit: true,
    topicKeys: {
      type: 'LEFT OUTER',
      relation: 'topic',
      pk: 'key',
      on: { key: 'member_topic.topicKey' },
      omit: false,
    },
  },
};

export async function findMember(id: string): Promise<Member | undefined> {
  return (await getDb().member.join(TOPIC_KEYS_JOINED_QUERY).find({ 'member.id': id }))[0];
}

export async function findMembers(): Promise<Member[]> {
  return getDb().member.join(TOPIC_KEYS_JOINED_QUERY).find();
}

export async function findMembersForTopic(topicKey: string): Promise<Member[]> {
  return getDb().member.join(TOPIC_KEYS_JOINED_QUERY).find({ 'member_topic.topicKey': topicKey });
}

export async function persistMember(member: Member): Promise<void> {
  await getDb().member.insert(member.toPersistedMember());
  await getDb().member_topic.insert(member.toPersistedMemberTopics());
}
