import { getSiteInfo } from '@/api/site';
import { defineStore } from 'pinia';
import { SiteState } from './types';

const useSiteStore = defineStore('site', {
  state: (): SiteState => ({
    installed: undefined,
    shortName: undefined,
    siteName: undefined,
    apiClosed: undefined,
  }),

  getters: {
    siteInfo(state: SiteState) {
      return state;
    },
  },
  actions: {
    setInfo(partial: Partial<SiteState>) {
      this.$patch(partial);
    },
    async info() {
      await getSiteInfo().then((res) => {
        this.setInfo(res.data);
      });
    },
  },
});
export default useSiteStore;
