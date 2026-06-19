import axios, { type AxiosInstance } from 'axios';

import { ENV } from '../config/env';

const client: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default client;
