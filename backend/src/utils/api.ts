import env from 'env-var';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IMember, ITld } from '@common/interfaces';
import { Tld } from '@models/Tld';

const baseURL: string = env.get('API_URL').required().asUrlString();
const encodedJwt: string = env.get('JWT').required().asString();

const apiClient: AxiosInstance = axios.create({
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

export async function upsertTld(tldObj: Tld): Promise<ITld> {
  const { tld, launchDate, launchDateConfirmed } = tldObj;
  const postData: ITld = { tld, launchDate, launchDateConfirmed };
  const response: AxiosResponse<ITld> = await apiClient.post('/tld', postData);
  return response.data;
}

export async function findTldsLaunchingToday(): Promise<ITld[]> {
  const response: AxiosResponse<ITld[]> = await apiClient.get('/tld?launchingToday');
  return response.data;
}
