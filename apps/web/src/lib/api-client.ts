import axios from 'axios';
import { tokenStorage } from './token';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url;
      const publicEndpoints = ['/auth/register', '/auth/login'];
      const isPublicEndpoint = publicEndpoints.some((ep) =>
        requestUrl?.includes(ep),
      );

      if (!isPublicEndpoint) {
        tokenStorage.remove();
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
