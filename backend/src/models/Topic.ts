export type PersistedMemberTopic = {
  memberId: string;
  topicKey: string;
};

export class Topic {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  static fromKeys = (topicKeys: string[]): Topic[] => {
    return topicKeys.map((topicKey: string) => new Topic(topicKey));
  };

  static fromPersistedMemberTopics = (persistedMemberTopics: PersistedMemberTopic[]): Topic[] => {
    return persistedMemberTopics.map(
      (persistedMemberTopic: PersistedMemberTopic) => new Topic(persistedMemberTopic.topicKey)
    );
  };
}
