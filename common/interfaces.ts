import { TopicKey, ErrorCode } from './enums';

export interface IMember {
  id: string;
  name: string;
  email: string;
  topics: ITopic[];
  createdAt: Date;
  updatedAt: Date;
}

interface ITopic {
  key: TopicKey;
}

export interface ITld {
  tld: string;
  launchDate: Date;
  launchDateConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMemberParams {
  name: string;
  email: string;
  topicKeys: TopicKey[];
}

export interface ApiError {
  errorCode: ErrorCode;
}
