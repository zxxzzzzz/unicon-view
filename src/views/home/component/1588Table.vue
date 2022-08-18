<template>
  <Table :columns="columns" :dataSource="filterDataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getPort1588Param } from '/@/api/union';
  import { computed } from 'vue';
  const props = defineProps<{ selectedPortList: string[] }>();
  const { data: dataSource, run: _getPort1588Param } = useRequest(getPort1588Param, {
    formatResult: (d) => {
      return d.ptp;
    },
  });
  const filterDataSource = computed(() => {
    if (!props.selectedPortList?.length) {
      return [];
    }
    if (!dataSource.value) {
      return [];
    }
    return dataSource.value.filter((d) => props.selectedPortList.includes(d.name));
  });

  // name: '端口名称',
  //     aliasName: '框-槽位-端口号',
  //     state: '端口状态',
  //     enableState: '使能状态',
  //     ptpClockId: '00:D0:DA:FF:FE:00:00:08', //时钟id
  //     ptpDomain: '1', //域号
  //     ptpProfile: 'itu-g8275-1', //ptp标准协议
  //     ptpPortStatus: 'master', //端口状态
  //     ptpClockClass: '6', //时钟等级
  //     ptpPriority1: '7', //优先级1
  //     ptpPriority2: '8', //优先级2
  //     timeSource: '160', //时间源
  //     announceIntv: '2', //通知间隔
  //     syncIntv: '2', //同步间隔
  //     delayIntv: '2', //延时间隔
  //     packageType: 'level2', //报文封装类型
  //     broadcastType: 'unicast', //报文播发类型
  //     delayMechanism: 'E2E', //延时机制
  //     timestampSend: '', //时间戳发送模式

  const columns: TableProps['columns'] = [
    { dataIndex: 'name', title: '端口名称' },
    { dataIndex: 'state', title: '端口状态' },
    { dataIndex: 'enableState', title: '使能状态' },
    { dataIndex: 'ptpClockId', title: '时钟id' },
    { dataIndex: 'ptpDomain', title: '域号' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 5,
  };
</script>
