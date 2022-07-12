import axios from 'axios';
import qs from 'query-string';

export interface CandidateRecord {
  id: number;
  name: string;
  studentId: string;
  phone: string;
  qq: string;
  counselor: string;
  club: string;
  choice1: string;
  choice2: string;
  reason: string;
  createdTime: string;
}

export interface CandidateQuery {
  name: string;
  club: string;
}

export interface CandidateParams extends Partial<CandidateQuery> {
  current: number;
  pageSize: number;
}

export interface CandidateListRes {
  list: CandidateRecord[];
  total: number;
}

export function queryCandidateList(params: CandidateParams) {
  return axios.get<CandidateListRes>('/api/candidate/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
