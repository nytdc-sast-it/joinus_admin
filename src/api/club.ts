import axios from 'axios';

export type ClubOrDepartment = 'club' | 'departement';

export interface DepartmentDTO {
  id: number;
  name: string;
  type: ClubOrDepartment;
}

export interface ClubDTO {
  id: number;
  name: string;
  departments: DepartmentDTO[];
  type: ClubOrDepartment;
}

export interface ClubList {
  list: ClubDTO[];
}

export interface NewClub {
  name: string;
}

export interface NewDepartment {
  clubId: number;
  name: string;
}

export function getClubList() {
  return axios.get<ClubList>('/api/club/list');
}

export function newClub(body: NewClub) {
  return axios.post<{
    club: ClubDTO;
  }>('/api/club/new', {
    ...body,
  });
}

export function deleteClub(id: number) {
  return axios.delete<null>(`/api/club/${id}`);
}

export function newDepartment(body: NewDepartment) {
  return axios.post<{
    department: DepartmentDTO;
  }>('/api/department/new', {
    ...body,
  });
}
