import { getDb } from '@utils/database';
import { Member } from '@models/Member';
import { Topic, topicsFromKeys } from '@models/Topic';

class PersistedMember {
  id: string;
  name: string;
  email: string;
  topicKeys: string[];

  constructor(id: string, name: string, email: string, topicKeys: string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.topicKeys = topicKeys;
  }

  static fromMember(member: Member): PersistedMember {
    const { id, name, email, topics } = member;
    const topicKeys: string[] = topics.map((topic: Topic) => topic.key);
    return new PersistedMember(id, name, email, topicKeys);
  }

  toMember = (): Member => {
    const { id, name, email, topicKeys } = this;
    return { id, name, email, topics: topicsFromKeys(topicKeys) };
  };
}

export async function findPersistedMember(id: string): Promise<Member> {
  return getDb().member.findOne(id).toMember();
}

export async function findPersistedMembers(topicKey?: string): Promise<Member[]> {
  return getDb().member.find({ topicKey });
}

export async function persistMember(member: Member): Promise<void> {
  const persistedMember = PersistedMember.fromMember(member);
  await getDb().member.save(persistedMember);
}
