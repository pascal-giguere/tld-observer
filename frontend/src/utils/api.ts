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
  timeout: 10 * 1000,
});

export async function createMember(params: CreateMemberParams): Promise<IMember> {
  const response = await apiClient.post<IMember>('/member', params);
  return response.data;
}

export async function deleteMember(memberId: string): Promise<void> {
  await apiClient.delete(`/member/${memberId}`);
}
