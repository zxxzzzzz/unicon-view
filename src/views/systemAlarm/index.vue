<template>
  <div>
    <Card>
      <Table :columns="columns" :dataSource="[]" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Table, Select, Card, Cascader } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { getUserInformation, setUserInformation } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { computed, h, ref } from 'vue';

  // const { data } = useRequest(getUserInformation, {});

  const columns: TableProps<any>['columns'] = [
    {
      dataIndex: 'position',
      title: '告警时间',
    },
    { dataIndex: 'userName', title: '告警模块' },
    {
      dataIndex: 'authority',
      title: '告警内容',
    },
  ];
</script>
