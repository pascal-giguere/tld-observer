import axios, { AxiosInstance } from 'axios';
import { IMember, CreateMemberParams } from '@common/interfaces';

const baseURL: string | undefined = process.env.GATSBY_API_URL;
if (!baseURL) {
  throw Error('API URL not defined');
}

const apiClient: AxiosInstance = axios.create({
  baseURL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

export async function createMember(params: CreateMemberParams): Promise<IMember> {
  const response = await apiClient.post<IMember>('/member', params);
  return response.data;
}
