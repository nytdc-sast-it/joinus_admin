<template>
  <div class="container">
    <Breadcrumb :items="['menu.admin', 'menu.admin.club']" />
    <a-card class="general-card" :title="$t('menu.admin.club')">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('club.operation.create') }}
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
            <template #cell>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('club.columns.operations.remove') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { ClubDTO, getClubList } from '@/api/club';

  const { loading, setLoading } = useLoading(true);
  const renderData = ref<ClubDTO[]>([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getClubList();
      renderData.value = data.list;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
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
