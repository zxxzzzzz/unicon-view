<template>
  <div>
    <Card>
      <Table :columns="columns" :dataSource="alarmDataSource" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Table, Card } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { getSystemAlarm } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { computed } from 'vue';

  const { data: alarmData } = useRequest(getSystemAlarm, {});
  const alarmDataSource = computed(() => {
    return alarmData.value?.alarmList || [];
  });

  const columns: TableProps<any>['columns'] = [
    {
      dataIndex: 'alarmTime',
      title: '告警时间',
    },
    { dataIndex: 'alarmModule', title: '告警模块' },
    {
      dataIndex: 'alarmMsg',
      title: '告警内容',
    },
  ];
</script>
