import localeLogin from '@/views/login/locale/zh-CN';

import localeApplication from '@/views/dashboard/application/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeLogin,
  ...localeApplication,
};
