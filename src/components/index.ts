import { App } from 'vue';
import AsyncComputed from 'vue-async-computed';
import Breadcrumb from './breadcrumb/index.vue';

export default {
  install(Vue: App) {
    Vue.component('Breadcrumb', Breadcrumb);
    Vue.use(AsyncComputed);
  },
};
