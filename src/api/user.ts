import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface UserDTO {
  id: number;
  username: string;
  club: string;
  department: string;
  admin: boolean;
}

export interface NewUser {
  username: string;
  password: string;
  clubId?: number;
  departmentId?: number;
  admin: boolean;
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/auth/login', data);
}

export function getUserInfo() {
  return axios.get<UserState>('/api/auth/current');
}

export function getUserList() {
  return axios.get<{
    list: UserDTO[];
  }>('/api/user/list');
}

export function newUser(body: NewUser) {
  return axios.post<{
    user: UserDTO;
  }>('/api/user/new', {
    ...body,
  });
}

export function deleteUser(id: number) {
  return axios.delete<null>(`/api/user/${id}`);
}
