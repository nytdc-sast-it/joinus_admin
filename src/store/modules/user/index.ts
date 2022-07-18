import { defineStore } from 'pinia';
import { login as userLogin, getUserInfo, LoginData } from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { useRouter } from 'vue-router';
import { UserState } from './types';

const router = useRouter();

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    username: undefined,
    avatar: undefined,
    role: '',
    admin: false,
    club: undefined,
    department: undefined,
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
          router.push({ name: 'login' });
        });
    },

    // Login
    async login(loginForm: LoginData) {
      await userLogin(loginForm)
        .then(async (res) => {
          setToken(res.data.token);
          await this.info();
        })
        .catch((err) => {
          clearToken();
          throw err;
        });
    },
    logoutCallBack() {
      this.resetInfo();
      clearToken();
      removeRouteListener();
    },
    // Logout
    async logout() {
      this.logoutCallBack();
    },
  },
});

export default useUserStore;
