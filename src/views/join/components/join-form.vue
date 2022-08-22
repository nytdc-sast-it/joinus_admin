<template>
  <div class="join-form-wrapper">
    <div class="join-form-title">{{ $t('join.form.title') }}</div>
    <div class="join-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="joinInfo"
      class="join-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <!-- 姓名 -->
      <a-form-item
        field="name"
        :rules="[
          { required: true, message: $t('join.form.name.errMsg.notBlank') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="joinInfo.name"
          :placeholder="$t('join.form.name.placeholder')"
        />
      </a-form-item>
      <!-- 学号 -->
      <a-form-item
        field="studentId"
        :rules="[
          {
            match: /^[0-9]{8}$/,
            message: $t('join.form.studentId.errMsg.length'),
          },
          {
            required: true,
            message: $t('join.form.studentId.errMsg.notBlank'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="joinInfo.studentId"
          :placeholder="$t('join.form.studentId.placeholder')"
        />
      </a-form-item>
      <!-- 手机号 -->
      <a-form-item
        field="phone"
        :rules="[
          { required: true, message: $t('join.form.phone.errMsg.notBlank') },
          {
            match: /^1[3456789]\d{9}$/,
            message: $t('join.form.phone.errMsg.format'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="joinInfo.phone"
          :placeholder="$t('join.form.phone.placeholder')"
        />
      </a-form-item>
      <!-- QQ -->
      <a-form-item
        field="qq"
        :rules="[
          { required: true, message: $t('join.form.qq.errMsg.notBlank') },
          {
            match: /^[1-9][0-9]{5,15}$/,
            message: $t('join.form.qq.errMsg.format'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="joinInfo.qq"
          :placeholder="$t('join.form.qq.placeholder')"
        />
      </a-form-item>
      <!-- 专业 -->
      <a-form-item
        field="major"
        :rules="[
          { required: true, message: $t('join.form.major.errMsg.notBlank') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="joinInfo.major"
          :placeholder="$t('join.form.major.placeholder')"
        />
      </a-form-item>
      <!-- 辅导员 -->
      <a-form-item
        field="counselor"
        :rules="[
          {
            required: true,
            message: $t('join.form.counselor.errMsg.notBlank'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="joinInfo.counselor"
          :placeholder="$t('join.form.counselor.placeholder')"
        />
      </a-form-item>
      <!-- 社团 -->
      <a-form-item
        field="club"
        :rules="[
          { required: true, message: $t('join.form.club.errMsg.notBlank') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-select
          v-model="joinInfo.club"
          :options="clubOptions"
          :placeholder="$t('join.form.club.placeholder')"
          @change="handleClubChange"
        />
      </a-form-item>
      <!-- 第一志愿 -->
      <a-form-item
        field="choice1"
        :rules="[
          { required: true, message: $t('join.form.choice1.errMsg.notBlank') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-select
          v-model="joinInfo.choice1"
          :options="departmentOptions"
          :placeholder="$t('join.form.choice1.placeholder')"
        />
      </a-form-item>
      <!-- 第二志愿 -->
      <a-form-item
        field="choice2"
        :rules="[
          { required: true, message: $t('join.form.choice2.errMsg.notBlank') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-select
          v-model="joinInfo.choice2"
          :options="departmentOptions"
          :placeholder="$t('join.form.choice2.placeholder')"
        />
      </a-form-item>
      <!-- 加入原因 -->
      <a-form-item
        field="reason"
        :rules="[
          { required: true, message: $t('join.form.reason.errMsg.notBlank') },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-textarea
          v-model="joinInfo.reason"
          :placeholder="$t('join.form.reason.placeholder')"
        />
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('join.form.submit') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import { Message, SelectOptionData } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { newCandidate, NewCandidateParams } from '@/api/candidate';
  import { asyncComputed } from '@vueuse/core';
  import { getClubList } from '@/api/club';

  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();

  const joinInfo = reactive({
    name: '',
    studentId: '',
    phone: '',
    qq: '',
    major: '',
    counselor: '',
    club: undefined,
    choice1: undefined,
    choice2: undefined,
    reason: '',
  });
  const handleClubChange = () => {
    joinInfo.choice1 = undefined;
    joinInfo.choice2 = undefined;
  };
  const clubOptions = asyncComputed<SelectOptionData[]>(async () => {
    const clubs = await getClubList();
    return clubs.data.list.map((item) => ({
      label: item.name,
      value: item.id,
      children: item.departments.map((department) => ({
        label: department.name,
        value: department.id,
      })),
    }));
  });
  const departmentOptions = computed<SelectOptionData[]>(() => {
    if (!joinInfo.club) {
      return [];
    }
    return (
      clubOptions.value.filter((it) => it.value === joinInfo.club)[0]
        ?.children ?? []
    );
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
        await newCandidate(values as NewCandidateParams);
        Message.success(t('join.success'));
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
</script>

<style lang="less" scoped>
  .join-form {
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
