import { TopicKey } from '@common/enums';

export type PersistedMemberTopic = {
  member_id: string;
  topic_key: TopicKey;
  created_at: Date;
};

export type PersistedTopic = {
  key: TopicKey;
  created_at: Date;
};

export class Topic {
  key: TopicKey;

  constructor(key: TopicKey) {
    this.key = key;
  }

  static fromPersistedTopic = (persistedTopic: PersistedTopic): Topic => {
    return new Topic(persistedTopic.key);
  };

  static fromKeys = (topicKeys: TopicKey[]): Topic[] => {
    return topicKeys.map((topicKey: TopicKey) => new Topic(topicKey));
  };
}
