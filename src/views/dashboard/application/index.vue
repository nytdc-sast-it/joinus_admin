<template>
  <div class="container">
    <Breadcrumb :items="['menu.dashboard', 'menu.dashboard.application']" />
    <a-card class="general-card" :title="$t('menu.dashboard.application')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <!-- 姓名 -->
              <a-col :span="8">
                <a-form-item field="name" :label="$t('application.form.name')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('application.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <!-- 社团 -->
              <a-col :span="8">
                <a-form-item
                  field="contentType"
                  :label="$t('application.form.club')"
                >
                  <a-select
                    v-model="formModel.club"
                    :options="clubOptions"
                    :placeholder="$t('application.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('application.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('application.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space />
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button @click="download">
            <template #icon>
              <icon-download />
            </template>
            {{ $t('application.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            :title="$t('application.columns.id')"
            data-index="id"
          />
          <a-table-column
            :title="$t('application.columns.name')"
            data-index="name"
          />
          <a-table-column
            :title="$t('application.columns.student_id')"
            data-index="studentId"
          />
          <a-table-column
            :title="$t('application.columns.phone')"
            data-index="phone"
          />
          <a-table-column
            :title="$t('application.columns.qq')"
            data-index="qq"
          />
          <a-table-column
            :title="$t('application.columns.major')"
            data-index="major"
          />
          <a-table-column
            :title="$t('application.columns.counselor')"
            data-index="counselor"
          />
          <a-table-column
            :title="$t('application.columns.club')"
            data-index="club"
          />
          <a-table-column
            :title="$t('application.columns.choice1')"
            data-index="choice1"
          />
          <a-table-column
            :title="$t('application.columns.choice2')"
            data-index="choice2"
          />
          <a-table-column
            :title="$t('application.columns.reason')"
            data-index="reason"
          />
          <a-table-column
            :title="$t('application.columns.createdTime')"
            data-index="createdTime"
          />
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import {
    CandidateRecord,
    CandidateQuery,
    CandidateParams,
    queryCandidateList,
    exportCandidateList,
  } from '@/api/candidate';
  import { getClubList } from '@/api/club';
  import { useUserStore } from '@/store';
  import { asyncComputed } from '@vueuse/core';

  const generateFormModel = () => {
    return {
      name: '',
      club: undefined,
    };
  };
  const { loading, setLoading } = useLoading(true);
  const renderData = ref<CandidateRecord[]>([]);
  const formModel = ref(generateFormModel());
  const userStore = useUserStore();
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const clubOptions = asyncComputed<SelectOptionData[]>(async () => {
    if (userStore.admin) {
      const res = await getClubList();
      return res.data.list.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    }
    return userStore.club
      ? [
          {
            label: userStore.club.name,
            value: userStore.club.id,
          },
        ]
      : [];
  });
  const download = () => {
    const params: CandidateQuery = {
      ...formModel.value,
    };
    exportCandidateList(params);
  };
  const fetchData = async (
    params: CandidateParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryCandidateList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as CandidateParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current, ...formModel.value });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
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
