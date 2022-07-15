import localeLogin from '@/views/login/locale/en-US';
import localeInstall from '@/views/install/locale/en-US';

import localeApplication from '@/views/dashboard/application/locale/en-US';

import localeClub from '@/views/admin/club/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.admin': 'Admin',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeInstall,
  ...localeSettings,
  ...localeLogin,
  ...localeApplication,
  ...localeClub,
};
