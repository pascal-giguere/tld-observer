import { getDb } from '@utils/database';
import { Member } from '@models/Member';

const TOPIC_KEYS_JOINED_QUERY = {
  member_topic: {
    type: 'INNER',
    pk: 'id',
    on: { member_id: 'id' },
    omit: true,
    topic_keys: {
      type: 'LEFT OUTER',
      relation: 'topic',
      pk: 'key',
      on: { key: 'member_topic.topic_key' },
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
  return getDb().member.join(TOPIC_KEYS_JOINED_QUERY).find({ 'member_topic.topic_key': topicKey });
}

export async function persistMember(member: Member): Promise<void> {
  await getDb().member.insert(member.toPersistedMember());
  await getDb().member_topic.insert(member.toPersistedMemberTopics());
}
