import axios from 'axios';

export interface SiteInfo {
  installed: boolean;
  shortName?: string;
  siteName?: string;
}

export interface SiteInstallData {
  shortName: string;
  siteName: string;
  admin: string;
  password: string;
}

export function getSiteInfo() {
  return axios.get<SiteInfo>('/api/site/info');
}

export function installSite(data: SiteInstallData) {
  return axios.post<SiteInfo>('/api/site/install', data);
}
