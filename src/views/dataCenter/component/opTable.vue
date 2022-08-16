<template>
  <Table :columns="columns" :dataSource="dataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getOperationsSystem } from '/@/api/union';
  // defineProps<{}>();
  const { data: dataSource, run: _getOperationsSystem } = useRequest(getOperationsSystem, {
    formatResult: (d) => d.Systemlist,
  });

  // name: 'ee9e416e-2886-11e6-a71d-7824af3f',
  //       userLabel: 'UL_SS_EMS',
  //       aliasName: 'EMS',
  //       softwareVersion: '2.1.16',
  //       productName: 'SNM',
  //       manufacturer: 'Saisi',
  //       ip: '192.168.1.222',
  //       location: '浙江省杭州市',
  //       status: '网管管理状态',
  //       runStatus: '网管运行状态',

  const columns: TableProps['columns'] = [
    { dataIndex: 'name', title: '端口名称' },
    { dataIndex: 'userLabel', title: '用户标签' },
    { dataIndex: 'aliasName', title: '别名' },
    { dataIndex: 'softwareVersion', title: '软件版本' },
    { dataIndex: 'manufacturer', title: '厂商' },
    { dataIndex: 'ip', title: 'ip' },
    { dataIndex: 'location', title: '地址' },
    { dataIndex: 'status', title: '网管管理状态' },
    { dataIndex: 'runStatus', title: '网管运行状态' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 20,
  };
</script>
