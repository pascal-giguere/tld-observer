import { TopicKey } from '@common/enums';

export type PersistedMemberTopic = {
  member_id: string;
  topic_key: TopicKey;
};

export class Topic {
  key: TopicKey;

  constructor(key: TopicKey) {
    this.key = key;
  }

  static fromKeys = (topicKeys: TopicKey[]): Topic[] => {
    return topicKeys.map((topicKey: TopicKey) => new Topic(topicKey));
  };

  static fromPersistedMemberTopics = (persistedMemberTopics: PersistedMemberTopic[]): Topic[] => {
    return persistedMemberTopics.map(
      (persistedMemberTopic: PersistedMemberTopic) => new Topic(persistedMemberTopic.topic_key)
    );
  };
}
