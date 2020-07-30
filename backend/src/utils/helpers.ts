import axios from 'axios';

export async function fetchFile(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}

export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
