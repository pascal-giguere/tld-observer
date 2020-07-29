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
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, name: string, email: string, topics: Topic[], createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.topics = topics;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPersistedMember = (persistedMember: TopicsJoinedPersistedMember): Member => {
    const { id, name, email, created_at, updated_at, topics } = persistedMember;
    return new Member(id, name, email, topics.map(Topic.fromPersistedTopic), created_at, updated_at);
  };

  toPersistedMember = (): PersistedMember => {
    const { id, name, email, createdAt, updatedAt } = this;
    return { id, name, email, created_at: createdAt, updated_at: updatedAt };
  };

  toPersistedMemberTopics = (createdAt: Date = new Date()): PersistedMemberTopic[] => {
    const { id, topics } = this;
    return topics.map((topic: Topic) => ({ member_id: id, topic_key: topic.key, created_at: createdAt }));
  };
}
