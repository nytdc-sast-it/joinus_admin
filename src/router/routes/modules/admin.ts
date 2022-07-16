import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const ADMIN: AppRouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.admin',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
    roles: ['admin'],
  },
  children: [
    {
      path: 'club',
      name: 'club',
      component: () => import('@/views/admin/club/index.vue'),
      meta: {
        locale: 'menu.admin.club',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/admin/user/index.vue'),
      meta: {
        locale: 'menu.admin.user',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default ADMIN;
