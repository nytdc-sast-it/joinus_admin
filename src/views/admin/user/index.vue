<template>
  <div class="container">
    <Breadcrumb :items="['menu.admin', 'menu.admin.user']" />
    <a-card class="general-card" :title="$t('menu.admin.user')">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleNewUserFormClick">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('user.operation.create') }}
              <a-modal
                v-model:visible="newUserFormVisible"
                :title="$t('user.new.form.title')"
                @cancel="handleNewUserFormCancel"
                @before-ok="handleNewUserBeforeOk"
                @ok="handleNewUserOk"
              >
                <a-form :model="newUserForm">
                  <a-form-item
                    field="username"
                    :label="$t('user.new.form.username')"
                  >
                    <a-input v-model="newUserForm.username" />
                  </a-form-item>
                  <a-form-item
                    field="username"
                    :label="$t('user.new.form.password')"
                  >
                    <a-input-password
                      v-model="newUserForm.password"
                      allow-clear
                    />
                  </a-form-item>
                  <a-form-item field="club" :label="$t('user.new.form.club')">
                    <a-select
                      v-model="newUserForm.club"
                      :options="clubOptions"
                      :placeholder="$t('application.form.selectDefault')"
                    />
                  </a-form-item>
                  <a-form-item field="admin" :label="$t('user.new.form.admin')">
                    <a-checkbox v-model="newUserForm.admin" />
                  </a-form-item>
                </a-form>
              </a-modal>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :data="renderData"
        :bordered="false"
      >
        <template #columns>
          <a-table-column :title="$t('user.columns.id')" data-index="id" />
          <a-table-column
            :title="$t('user.columns.username')"
            data-index="username"
          />
          <a-table-column :title="$t('user.columns.club')" data-index="club" />
          <a-table-column
            :title="$t('user.columns.admin')"
            data-index="admin"
          />
          <a-table-column
            :title="$t('user.columns.operations')"
            data-index="operations"
          >
            <template #cell="scope">
              <a-popconfirm
                :content="$t('user.operation.remove.tip')"
                @ok="remove((scope.record as UserDTO).id)"
              >
                <a-button
                  v-permission="['admin']"
                  type="text"
                  size="small"
                  :disabled="(scope.record as UserDTO).admin || userStore.id === (scope.record as UserDTO).id"
                  >{{ $t('user.columns.operations.remove') }}</a-button
                >
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { getClubList } from '@/api/club';
  import { Message, SelectOptionData } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import {
    getUserList,
    NewUser,
    newUser,
    deleteUser,
    UserDTO,
  } from '@/api/user';
  import { useUserStore } from '@/store';
  import { asyncComputed } from '@vueuse/core';

  const { t } = useI18n();

  const userStore = useUserStore();

  const { loading, setLoading } = useLoading(true);
  const newUserFormVisible = ref(false);
  const newUserForm = reactive({
    username: '',
    password: '',
    club: undefined,
    admin: false,
  });
  const clubOptions = asyncComputed<SelectOptionData[]>(async () => {
    if (userStore.admin || !userStore.club) {
      const res = await getClubList();
      return res.data.list.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    }
    return [
      {
        label: userStore.club.name,
        value: userStore.club.id,
      },
    ];
  });
  const renderData = ref<
    {
      id: number;
      username: string;
      club: string;
      admin: boolean;
    }[]
  >([]);
  const remove = async (id: number) => {
    try {
      await deleteUser(id);
      Message.success(t('user.operation.remove.success'));
    } finally {
      await fetchData();
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getUserList();
      renderData.value = data.list;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const handleNewUserFormCancel = () => {
    newUserFormVisible.value = false;
  };
  const handleNewUserFormClick = () => {
    newUserFormVisible.value = true;
  };
  const handleNewUserBeforeOk = (done: (closed: boolean) => void) => {
    const body: NewUser = {
      username: newUserForm.username,
      password: newUserForm.password,
      clubId: newUserForm.club,
      admin: newUserForm.admin,
    };
    try {
      newUser(body).then((res) => {
        if (res.data.user.id > 0) {
          Message.success(t('user.new.form.success'));
        }
      });
    } finally {
      done(true);
    }
  };
  const handleNewUserOk = async () => {
    newUserFormVisible.value = false;
    await fetchData();
  };
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'User',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
