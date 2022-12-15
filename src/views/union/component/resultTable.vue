<template>
  <div>
    <Tabs v-model:activeKey="activeResultKey">
      <TabPane key="1588" tab="1588">
        <Table :columns="columns1588" :dataSource="data1588Source" :pagination="false" />
      </TabPane>
      <TabPane key="sync" tab="sync">
        <Table :columns="columnsSync" :dataSource="data1588Source" :pagination="false" />
      </TabPane>
      <TabPane key="link" tab="链路信息">
        <Table :columns="linkSync" :dataSource="data1588Source" :pagination="false" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script lang="ts" setup>
  import { Table, Input, Button, Select, Tabs, TabPane } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { h, ref, toRaw } from 'vue';

  type Item1588 = {
    devName: string;
    name: string;
    state: string;
    ptpClockId: string;
    ptpDomain: string;
    ptpProtocol: string;
    ptpClockClass: string;
    ptpPriority1: string;
    ptpPriority2: string;
    timeSource: string;
    announceIntv: string;
    syncIntv: string;
    delayIntv: string;
    packageType: string;
    broadcastType: string;
    delayMechanism: string;
    timeStampSendMode: string;
    accuracy: string;
  };
  type ItemSync = {
    devName: string;
    name: string;
    state: string;
    ptpClockId: string;
    ptpDomain: string;
    ptpProtocol: string;
    ptpClockClass: string;
    ptpPriority1: string;
    ptpPriority2: string;
    timeSource: string;
    announceIntv: string;
    syncIntv: string;
    delayIntv: string;
    packageType: string;
    broadcastType: string;
    delayMechanism: string;
    timeStampSendMode: string;
    accuracy: string;
  };
  // defineProps<{}>();
  const emits = defineEmits(['change']);
  const data1588Source = ref<Item1588[]>([]);
  const dataSyncSource = ref<ItemSync[]>([]);
  const activeResultKey = ref('1588');

  const handleAdd = () => {
    data1588Source.value = [
      ...data1588Source.value,
      {
        devName: '',
        name: '',
        state: '',
        ptpClockId: '',
        ptpDomain: '',
        ptpProtocol: '',
        ptpClockClass: '',
        ptpPriority1: '',
        ptpPriority2: '',
        timeSource: '',
        announceIntv: '',
        syncIntv: '',
        delayIntv: '',
        packageType: '',
        broadcastType: '',
        delayMechanism: '',
        timeStampSendMode: '',
        accuracy: '',
      },
    ];
    emits('change', getFormat1588Data());
  };

  const getFormat1588Data = () => {
    return {
      dataType: 'ptp',
      devName: data1588Source.value?.[0]?.devName || '',
      portList: toRaw(data1588Source.value),
    };
  };
  const columns1588: TableProps['columns'] = [
    {
      dataIndex: 'devName',
      title: '网元名称',
    },
    {
      dataIndex: 'name',
      title: '端口名称',
    },
    {
      dataIndex: 'state',
      title: '端口状态',
    },
    {
      dataIndex: 'ptpClockId',
      title: '时钟id',
    },
    {
      dataIndex: 'ptpDomain',
      title: '域号',
    },
    {
      dataIndex: 'ptpClockClass',
      title: '时钟等级',
    },
    {
      dataIndex: 'ptpPriority1',
      title: '优先级1',
    },
    {
      dataIndex: 'timeSource',
      title: '时间源',
    },
    {
      dataIndex: 'accuracy',
      title: '精度预期',
    },
  ];
  const columnsSync: TableProps['columns'] = [
    {
      dataIndex: 'devName',
      title: '网元名称',
    },
    {
      dataIndex: 'name',
      title: '端口名称',
    },
    {
      dataIndex: 'state',
      title: '使能时钟同步',
    },
    {
      dataIndex: 'ptpClockId',
      title: '时钟源状态',
    },
    {
      dataIndex: 'ptpDomain',
      title: '参考时钟源',
    },
    {
      dataIndex: 'ptpClockClass',
      title: '物理层状态',
    },
    {
      dataIndex: 'ptpPriority1',
      title: 'E1端口ais信号告警检测使能',
    },
    {
      dataIndex: 'timeSource',
      title: '系统优先级',
    },
    {
      dataIndex: 'accuracy',
      title: '输出SSM等级',
    },
    {
      dataIndex: 'accuracy',
      title: '输出时钟ID',
    },
    {
      dataIndex: 'accuracy',
      title: '精度预期',
    },
  ];
  const linkSync: TableProps['columns'] = [
    {
      dataIndex: 'devName',
      title: '链路名称',
    },
    {
      dataIndex: 'name',
      title: '源网元',
    },
    {
      dataIndex: 'state',
      title: '源端口',
    },
    {
      dataIndex: 'ptpClockId',
      title: '宿网元',
    },
    {
      dataIndex: 'ptpDomain',
      title: '宿端口',
    },
    {
      dataIndex: 'ptpClockClass',
      title: '同步方式',
    },
  ];
</script>
