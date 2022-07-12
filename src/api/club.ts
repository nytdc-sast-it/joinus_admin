import axios from 'axios';

export interface ClubDTO {
  id: number;
  name: string;
}

export interface ClubList {
  list: ClubDTO[];
}

export function getClubList() {
  return axios.get<ClubList>('/api/club/list');
}
