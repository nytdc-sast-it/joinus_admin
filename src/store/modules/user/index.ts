import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { useRouter } from 'vue-router';
import { UserState } from './types';
import useAppStore from '../app';

const router = useRouter();

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    username: undefined,
    avatar: undefined,
    role: '',
    isAdmin: false,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      await getUserInfo()
        .then((res) => {
          this.setInfo(res.data);
        })
        .catch(() => {
          clearToken();
          removeRouteListener();
          router.push('/login');
        });
    },

    // Login
    async login(loginForm: LoginData) {
      await userLogin(loginForm)
        .then((res) => setToken(res.data.token))
        .catch((err) => {
          clearToken();
          throw err;
        });
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;