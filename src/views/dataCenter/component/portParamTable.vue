<template>
  <Table :columns="columns" :dataSource="dataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getPortParam } from '/@/api/union';
  // defineProps<{}>();
  const { data: dataSource, run: _getPortParam } = useRequest(getPortParam, {
    formatResult: (d) => d.portlist,
  });

  // name: '端口名称',
  // aliasName: '框-槽位-端口号',
  // state: '端口状态',
  // enableState: '使能状态',
  // ptpClockId: '00:D0:DA:FF:FE:00:00:08', //时钟id
  // ptpDomain: '1', //域号
  // ptpClockClass: '6', //时钟等级
  // ptpPriority1: '7', //优先级1
  // ptpPriority2: '8', //优先级2
  // timeSource: '160', //时间源
  // announceIntv: '2', //通知间隔
  // syncIntv: '2', //同步间隔
  // delayIntv: '2', //延时间隔
  // packageType: 'level2', //报文封装类型
  // broadcastType: 'unicast', //报文播发类型
  // delayMechanism: 'E2E', //延时机制

  const columns: TableProps['columns'] = [
    { dataIndex: 'name', title: '端口名称' },
    { dataIndex: 'aliasName', title: '框-槽位-端口号' },
    { dataIndex: 'state', title: '端口状态' },
    { dataIndex: 'enableState', title: '使能状态' },
    { dataIndex: 'ptpClockId', title: '时钟id' },
    { dataIndex: 'ptpDomain', title: '域号' },
    { dataIndex: 'ptpClockClass', title: '时钟等级' },
    { dataIndex: 'ptpPriority1', title: '优先级1' },
    { dataIndex: 'ptpPriority2', title: '优先级2' },
    { dataIndex: 'timeSource', title: '时间源' },
    { dataIndex: 'announceIntv', title: '通知间隔' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 20,
  };
</script>
