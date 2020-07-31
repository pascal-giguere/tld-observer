import { TopicKey, ErrorCode } from './enums';

export interface IMember {
  id: string;
  name: string;
  email: string;
  topics: ITopic[];
}

interface ITopic {
  key: TopicKey;
}

export interface ITld {
  tld: string;
  launchDate: string;
  launchDateConfirmed: boolean;
}

export interface CreateMemberParams {
  name: string;
  email: string;
  topicKeys: TopicKey[];
}

export interface ApiError {
  errorCode: ErrorCode;
}
