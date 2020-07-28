type GetParams = {
  id: string;
};

type CreateParams = {
  name: string;
  email: string;
  topicKeys: string[];
};

export function areGetParamsValid(params: unknown): params is GetParams {
  return true;
}

export function areCreateParamsValid(params: unknown): params is CreateParams {
  return true;
}
