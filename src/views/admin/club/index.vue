<template>
  <div class="container">
    <Breadcrumb :items="['menu.admin', 'menu.admin.club']" />
    <a-card class="general-card" :title="$t('menu.admin.club')">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleNewClubFormClick">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('club.operation.create') }}
              <a-modal
                v-model:visible="newClubFormVisible"
                :title="$t('club.new.form.title')"
                @cancel="handleNewClubFormCancel"
                @before-ok="handleNewClubBeforeOk"
                @ok="handleNewClubOk"
              >
                <a-form :model="newClubForm">
                  <a-form-item field="name" :label="$t('club.new.form.name')">
                    <a-input v-model="newClubForm.name" />
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
          <a-table-column :title="$t('club.columns.id')" data-index="id" />
          <a-table-column :title="$t('club.columns.name')" data-index="name" />
          <a-table-column
            :title="$t('club.columns.operations')"
            data-index="operations"
          >
            <template #cell="scope">
              <a-popconfirm
                :content="$t('club.operation.remove.tip')"
                @ok="remove(scope.record.type, (scope.record as ClubDTO).id)"
              >
                <a-button v-permission="['admin']" type="text" size="small">{{
                  $t('club.columns.operations.remove')
                }}</a-button>
              </a-popconfirm>
              <a-button
                v-if="scope.record.type === 'club'"
                v-permission="['admin']"
                type="text"
                size="small"
                @click="handleNewDepartmentFormClick(scope.record as ClubDTO)"
              >
                {{ $t('club.columns.operations.new_department') }}
                <a-modal
                  v-model:visible="newDepartmentFormVisible"
                  :title="$t('department.operation.new')"
                  @cancel="handleNewDepartmentFormCancel"
                  @before-ok="handleNewDepartmentBeforeOk"
                  @ok="handleNewDepartmentOk"
                >
                  <a-form :model="newDepartmentForm">
                    <a-form-item
                      field="club"
                      :label="$t('department.new.form.club')"
                    >
                      <a-input v-model="newDepartmentForm.club.name" disabled />
                    </a-form-item>
                    <a-form-item
                      field="name"
                      :label="$t('department.new.form.name')"
                    >
                      <a-input v-model="newDepartmentForm.name" />
                    </a-form-item>
                  </a-form>
                </a-modal>
              </a-button>
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
  import {
    ClubDTO,
    deleteClub,
    DepartmentDTO,
    getClubList,
    NewClub,
    NewDepartment,
    newClub,
    newDepartment,
  } from '@/api/club';
  import type { ClubOrDepartment } from '@/api/club';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const { loading, setLoading } = useLoading(true);
  const newClubFormVisible = ref(false);
  const newClubForm = reactive({
    name: '',
  });
  const newDepartmentFormVisible = ref(false);
  const newDepartmentForm = reactive({
    name: '',
    club: {} as ClubDTO,
  });
  const renderData = ref<
    {
      id: number;
      name: string;
      children: DepartmentDTO[];
      type: ClubOrDepartment;
    }[]
  >([]);
  const remove = async (type: ClubOrDepartment, id: number) => {
    try {
      if (type === 'club') {
        await deleteClub(id);
      } else {
        Message.info(t('department.operation.remove.coming_soon'));
        return;
      }
      Message.success(t('club.operation.remove.success'));
    } finally {
      await fetchData();
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getClubList();
      renderData.value = data.list.map((item: ClubDTO) => {
        return {
          id: item.id,
          name: item.name,
          children: item.departments,
          type: item.type,
        };
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const handleNewClubFormCancel = () => {
    newClubFormVisible.value = false;
  };
  const handleNewDepartmentFormCancel = () => {
    newClubFormVisible.value = false;
  };
  const handleNewClubFormClick = () => {
    newClubFormVisible.value = true;
  };
  const handleNewDepartmentFormClick = (club: ClubDTO) => {
    newDepartmentForm.club = club;
    newDepartmentFormVisible.value = true;
  };
  const handleNewClubBeforeOk = (done: (closed: boolean) => void) => {
    const body: NewClub = {
      name: newClubForm.name,
    };
    try {
      newClub(body).then((res) => {
        if (res.data.club.id > 0) {
          fetchData();
          Message.success(t('club.new.form.success'));
        }
      });
    } finally {
      done(true);
    }
  };
  const handleNewDepartmentOk = async () => {
    newDepartmentFormVisible.value = false;
    await fetchData();
  };
  const handleNewDepartmentBeforeOk = (done: (closed: boolean) => void) => {
    const body: NewDepartment = {
      name: newDepartmentForm.name,
      clubId: newDepartmentForm.club.id,
    };
    try {
      newDepartment(body).then((res) => {
        if (res.data.department.id > 0) {
          fetchData();
          Message.success(t('department.new.form.success'));
        }
      });
    } finally {
      done(true);
    }
  };
  const handleNewClubOk = async () => {
    newClubFormVisible.value = false;
    await fetchData();
  };
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'Club',
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
