<template>
  <Table :columns="columns" :dataSource="dataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getUserOperation } from '/@/api/union';
  // defineProps<{}>();
  const { data: dataSource, run: _getUserOperation } = useRequest(getUserOperation, {
    formatResult: (d) => d.userList,
  });

  // username: '用户名称',
  // position: '登录地点',
  // Module: '操作模块',
  // msg: '操作内容',
  // 'start-time': '操作开始时间',
  // 'end-time': '操作结束时间',

  const columns: TableProps['columns'] = [
    { dataIndex: 'userName', title: '用户名称' },
    { dataIndex: 'position', title: '登录地点' },
    { dataIndex: 'module', title: '操作模块' },
    { dataIndex: 'msg', title: '操作内容' },
    { dataIndex: 'startTime', title: '登录起始时间' },
    { dataIndex: 'endTime', title: '登录结束时间' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 20,
  };
</script>
