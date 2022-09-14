<template>
  <Table :columns="columns" :dataSource="dataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getUserLogin } from '/@/api/union';
  // defineProps<{}>();
  const { data: dataSource, run: _getUserLogin } = useRequest(getUserLogin, {
    formatResult: (d) => d.Userlist,
  });

  // username: '用户名称',
  // state: '登录状态',
  // position: '登录地点',
  // 'start-time': '登录起始时间',
  // 'end-time': '登录结束时间',

  const columns: TableProps['columns'] = [
    { dataIndex: 'username', title: '用户名称' },
    { dataIndex: 'state', title: '登录状态' },
    { dataIndex: 'position', title: '登录地点' },
    { dataIndex: 'start-time', title: '登录起始时间' },
    { dataIndex: 'end-time', title: '登录结束时间' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 20,
  };
</script>
