<template>
  <div class="container">
    <JoinBanner />
    <div class="content">
      <div class="content-inner">
        <JoinForm v-if="!apiCposed" />
        <div v-else>不在招新时间范围内！</div>
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import { useSiteStore } from '@/store';
  import { computed } from 'vue';
  import JoinBanner from './components/banner.vue';
  import JoinForm from './components/join-form.vue';

  const siteStore = useSiteStore();
  const apiCposed = computed(() => {
    return siteStore.apiClosed;
  });
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        display: none;
      }
    }
  }
</style>
