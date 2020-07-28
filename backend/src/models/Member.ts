import { Topic, PersistedMemberTopic } from '@models/Topic';

export type PersistedMember = {
  id: string;
  name: string;
  email: string;
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

  static fromPersistedData = (
    persistedMember: PersistedMember,
    persistedMemberTopics: PersistedMemberTopic[]
  ): Member => {
    const { id, name, email } = persistedMember;
    return new Member(id, name, email, Topic.fromPersistedMemberTopics(persistedMemberTopics));
  };

  toPersistedMember = (): PersistedMember => {
    const { id, name, email } = this;
    return { id, name, email };
  };

  toPersistedMemberTopics = (): PersistedMemberTopic[] => {
    const { id, topics } = this;
    return topics.map((topic: Topic) => ({ memberId: id, topicKey: topic.key }));
  };
}
