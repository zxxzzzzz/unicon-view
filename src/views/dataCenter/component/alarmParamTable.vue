<template>
  <Table :columns="columns" :dataSource="dataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getAlarmParam } from '/@/api/union';
  // defineProps<{}>();
  const { data: dataSource, run: _getAlarmParam } = useRequest(getAlarmParam, {
    formatResult: (d) => d.alarmlist,
  });

  // id: '告警 id',
  // type: '设备/网管',
  // alarmNo: '告警类别名称',
  // deviceId: '网元 id',
  // alarmLevel: '告警等级',
  // alarmModule: '告警源',
  // alarmDesc: '告警描述',
  // alarmState: '告警状态', //（产生、已确认未清除、未确认已清除）
  // alarmTime: '告警时间',
  // confirmTime: '确认时间',
  // clearTime: '清除时间',

  const columns: TableProps['columns'] = [
    { dataIndex: 'id', title: '告警 id' },
    { dataIndex: 'type', title: '设备/网管' },
    { dataIndex: 'alarmNo', title: '告警类别名称' },
    { dataIndex: 'deviceId', title: '网元 id' },
    { dataIndex: 'alarmLevel', title: '告警等级' },
    { dataIndex: 'alarmModule', title: '告警源' },
    { dataIndex: 'alarmDesc', title: '告警描述' },
    { dataIndex: 'alarmState', title: '告警状态' },
    { dataIndex: 'alarmTime', title: '告警时间' },
    { dataIndex: 'confirmTime', title: '确认时间' },
    { dataIndex: 'clearTime', title: '清除时间' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 20,
  };
</script>
