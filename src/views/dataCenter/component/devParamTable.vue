<template>
  <Table :columns="columns" :dataSource="props.dataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  // import { useRequest } from 'vue-request';
  // import { getDevParam } from '/@/api/union';
  const props = defineProps<{ dataSource: any }>();
  // const { data: dataSource, run: _getDevParam } = useRequest(getDevParam, {
  //   formatResult: (d) => d.devlist,
  // });

  // id: '网元 id',
  // name: '网元名称',
  // status: '网元管理状态',
  // runStatus: '网元运行状态',
  // deviceType: '网元类型',
  // ip: '网元 ip',
  // location: '网元位置',
  // vendor: '网元厂商',
  // hwVersion: '硬件版本信息',
  // swVersion: '软件版本信息',

  const columns: TableProps['columns'] = [
    { dataIndex: 'id', title: '端口名称' },
    { dataIndex: 'name', title: '网元名称' },
    { dataIndex: 'deviceType', title: '网元类型' },
    { dataIndex: 'aliasName', title: '别名' },
    { dataIndex: 'hwVersion', title: '硬件版本信息' },
    { dataIndex: 'swVersion', title: '软件版本信息' },
    { dataIndex: 'ip', title: 'ip' },
    { dataIndex: 'location', title: '网元位置' },
    { dataIndex: 'status', title: '网元管理状态' },
    { dataIndex: 'runStatus', title: '网元运行状态' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 20,
  };
</script>
