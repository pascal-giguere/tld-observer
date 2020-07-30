import { Topic, PersistedTopic, PersistedMemberTopic } from '@models/Topic';

export type PersistedMember = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export type TopicsJoinedPersistedMember = PersistedMember & {
  topics: PersistedTopic[];
};

export class Member {
  id: string;
  name: string;
  email: string;
  topics: Topic[];

  constructor(id: string, name: string, email: string, topics: Topic[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.topics = topics;
  }

  static fromPersistedMember = (persistedMember: TopicsJoinedPersistedMember): Member => {
    const { id, name, email, topics } = persistedMember;
    return new Member(id, name, email, topics.map(Topic.fromPersistedTopic));
  };

  toPersistedMember = (createdAt: Date, updatedAt: Date): PersistedMember => {
    const { id, name, email } = this;
    return { id, name, email, created_at: createdAt, updated_at: updatedAt };
  };

  toPersistedMemberTopics = (createdAt: Date): PersistedMemberTopic[] => {
    const { id, topics } = this;
    return topics.map((topic: Topic) => ({ member_id: id, topic_key: topic.key, created_at: createdAt }));
  };
}
