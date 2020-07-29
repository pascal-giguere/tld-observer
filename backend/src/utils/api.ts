import env from 'env-var';
import axios, { AxiosInstance } from 'axios';

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
