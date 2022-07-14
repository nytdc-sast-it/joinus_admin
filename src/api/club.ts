import axios from 'axios';

export interface ClubDTO {
  id: number;
  name: string;
}

export interface ClubList {
  list: ClubDTO[];
}

export interface NewClub {
  name: string;
}

export function getClubList() {
  return axios.get<ClubList>('/api/club/list');
}

export function newClub(body: NewClub) {
  return axios.post<ClubDTO>('/api/club/new', {
    ...body,
  });
}

export function deleteClub(id: number) {
  return axios.delete<null>(`/api/club/${id}`);
}
