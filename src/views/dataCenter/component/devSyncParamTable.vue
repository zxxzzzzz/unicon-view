<template>
  <Table :columns="columns" :dataSource="dataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getDevSyncParam } from '/@/api/union';
  // defineProps<{}>();
  const { data: dataSource, run: _getDevSyncParam } = useRequest(getDevSyncParam, {
    formatResult: (d) => d.devinforlist,
  });

  //  deviceId: '网元 ID',
  // refTimeInput: '参考时间源端口',
  // refFreqInput: '参考频率源端口',
  // timeStatus: '时间状态',
  // freqStatus: '时钟状态',
  // systemTime: '网元系统时间',
  // cc1State: '钟卡 1 状态',
  // cc2State: '钟卡 2 状态',
  // latitude: 'N37:22:43.425',
  // longitude: 'E121:55:34.815',
  // high: '13.7',

  const columns: TableProps['columns'] = [
    { dataIndex: 'deviceId', title: '网元ID' },
    { dataIndex: 'refTimeInput', title: '参考时间源端口' },
    { dataIndex: 'refFreqInput', title: '参考频率源端口' },
    { dataIndex: 'timeStatus', title: '时间状态' },
    { dataIndex: 'freqStatus', title: '时钟状态' },
    { dataIndex: 'systemTime', title: '网元系统时间' },
    { dataIndex: 'cc1State', title: '钟卡 1 状态' },
    { dataIndex: 'cc2State', title: '钟卡 2 状态' },
    { dataIndex: 'latitude', title: '经度' },
    { dataIndex: 'longitude', title: '纬度' },
    { dataIndex: 'high', title: '海拔' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 20,
  };
</script>
