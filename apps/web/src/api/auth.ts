import apiClient from '../lib/api-client';
import type { AuthResponse, RegisterRequest, LoginRequest, User } from '../types/auth';

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<User>('/auth/me');
  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}
