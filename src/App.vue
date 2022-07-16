<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import useLocale from '@/hooks/locale';
  import { useRouter } from 'vue-router';
  import { useSiteStore } from './store';

  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return enUS;
    }
  });
  const siteStore = useSiteStore();
  const router = useRouter();
  siteStore.info().catch(() => {
    // 未安装
    router.push({ name: 'install' });
  });
</script>
