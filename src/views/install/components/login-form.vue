<template>
  <div class="install-form-wrapper">
    <div class="install-form-title">{{ $t('install.form.title') }}</div>
    <div class="install-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="installInfo"
      class="install-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="siteName"
        :rules="[
          { required: true, message: $t('install.form.sitename.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="installInfo.siteName"
          :placeholder="$t('install.form.sitename.placeholder')"
        />
      </a-form-item>
      <a-form-item
        field="admin"
        :rules="[
          { required: true, message: $t('install.form.shortname.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="installInfo.shortName"
          :placeholder="$t('install.form.shortname.placeholder')"
        />
      </a-form-item>
      <a-form-item
        field="admin"
        :rules="[{ required: true, message: $t('install.form.admin.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="installInfo.admin"
          :placeholder="$t('install.form.admin.placeholder')"
        />
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[
          { required: true, message: $t('install.form.password.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="installInfo.password"
          :placeholder="$t('install.form.password.placeholder')"
          allow-clear
        />
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('install.form.install') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { installSite, SiteInstallData } from '@/api/site';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();

  const installInfo = reactive({
    siteName: '',
    shortName: '',
    admin: '',
    password: '',
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (!errors) {
      setLoading(true);
      try {
        await installSite(values as SiteInstallData);
        router.push({
          name: 'Login',
        });
        Message.success(t('install.success'));
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
</script>

<style lang="less" scoped>
  .install-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
