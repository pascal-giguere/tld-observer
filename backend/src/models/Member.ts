import { Topic } from '@models/Topic';

export type Member = {
  id: string;
  name: string;
  email: string;
  topics: Topic[];
};
