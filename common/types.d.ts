interface IMember {
  id: string;
  name: string;
  email: string;
  topics: ITopic[];
}

interface ITopic {
  key: string;
}

interface CreateMemberParams {
  name: string;
  email: string;
  topicKeys: string[];
}
