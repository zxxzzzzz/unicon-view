<template>
  <div>
    <Table :columns="columns" :dataSource="dataSource?.[0]" :pagination="pagination" />
    <Table :columns="columns" :dataSource="dataSource?.[1]" :pagination="pagination" />
    <Table :columns="columns" :dataSource="dataSource?.[2]" :pagination="pagination" />
  </div>
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getHomeAlarm } from '/@/api/union/index';
  // defineProps<{}>();
  const { data: dataSource, run: _getHomeAlarm } = useRequest(getHomeAlarm, {
    formatResult: (d) => {
      return d.alarm.reduce(
        (re, al) => {
          if (al.alarmLevel === '重要') {
            re[0].push(al);
          }
          if (al.alarmLevel === '主要') {
            re[1].push(al);
          }
          if (al.alarmLevel === '次要') {
            re[2].push(al);
          }
          return re;
        },
        [[], [], []] as any[][],
      );
    },
  });

  // id: '告警 id',
  //   type: '设备/网管',
  //   alarmNo: '告警类别名称',
  //   deviceId: '网元 id',
  //   alarmLevel: '告警等级',
  //   alarmModule: '告警源',
  //   alarmDesc: '告警描述',
  //   alarmState: '告警状态', //（产生、已确认未清除、未确认已清除）
  //   alarmTime: '告警时间',
  //   confirmTime: '确认时间',
  //   clearTime: '清除时间',

  const columns: TableProps['columns'] = [
    { dataIndex: 'type', title: '设备/网管' },
    { dataIndex: 'deviceId', title: '网元 id' },
    { dataIndex: 'alarmLevel', title: '告警等级' },
    { dataIndex: 'alarmModule', title: '告警源' },
    { dataIndex: 'alarmDesc', title: '告警描述' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 4,
  };

  defineExpose({
    update: () => _getHomeAlarm(),
  });
</script>
