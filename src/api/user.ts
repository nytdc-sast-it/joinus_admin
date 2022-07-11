import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/auth/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/auth/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/api/auth/current');
}
