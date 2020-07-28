export type Topic = {
  key: string;
};

export function topicsFromKeys(topicKeys: string[]): Topic[] {
  return topicKeys.map((key: string) => ({ key }));
}
