import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useSiteStore from './modules/site';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useSiteStore };
export default pinia;
