import env from 'env-var';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IMember } from '@common/interfaces';

const baseURL: string = env.get('API_URL').required().asUrlString();
const encodedJwt: string = env.get('JWT').required().asString();

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${encodedJwt}`,
    'Content-Type': 'application/json',
  },
  timeout: 30 * 1000,
});

export async function findMembersWithTopicKey(topicKey: string): Promise<IMember[]> {
  const response: AxiosResponse<IMember[]> = await apiClient.get(`/member?topicKey=${topicKey}`);
  return response.data;
}
