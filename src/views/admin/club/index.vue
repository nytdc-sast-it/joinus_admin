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
            <template #cell="scope">
              <a-popconfirm
                :content="$t('club.operation.remove.tip')"
                :ok-loading="removing"
                @ok="remove((scope.record as ClubDTO).id)"
              >
                <a-button v-permission="['admin']" type="text" size="small">{{
                  $t('club.columns.operations.remove')
                }}</a-button>
              </a-popconfirm>
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
  import { ClubDTO, deleteClub, getClubList } from '@/api/club';
  import { Message } from '@arco-design/web-vue';

  const { loading, setLoading } = useLoading(true);
  const removing = ref(false);
  const renderData = ref<ClubDTO[]>([]);
  const remove = async (id: number) => {
    try {
      await deleteClub(id);
      Message.success("$t('club.operation.remove.success')");
    } finally {
      await fetchData();
    }
  };
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
