<template>
  <div>
    <Tabs v-model:activeKey="activeResultKey">
      <TabPane key="1588" tab="1588">
        <div class="overflow-auto w-full">
          <Table :columns="columns1588" :dataSource="data1588Source" />
        </div>
      </TabPane>
      <TabPane key="sync" tab="sync">
        <div class="overflow-auto w-full">
          <Table :columns="columnsSync" :dataSource="dataSyncSource" />
        </div>
      </TabPane>
      <TabPane key="link" tab="链路信息">
        <div class="overflow-auto w-full">
          <Table :columns="linkSync" :dataSource="dataLinkSource" />
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script lang="ts" setup>
  import { Table, Tabs, TabPane } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { ref, computed } from 'vue';

  type Item1588 = {
    devName: string;
    accuracy: string;
    enableState: string;
    portName: string;
    ptpClockClass: string;
    ptpClockId: string;
    ptpDomain: string;
    ptpPriority: string;
    state: string;
    timeSource: string;
  };
  type ItemSync = {
    accuracy: string;
    clockStatus: string;
    enableTimeSync: string;
    outClockID: string;
    outSSMLevel: string;
    physicalLayerStatus: string;
    portName: string;
    referenceClock: string;
    signalStyle: string;
    systemPriority: string;
    timeStamp: string;
  };
  type ItemLink = {
    Dev1: string;
    connectDev2: string;
    linkType: string;
    object: string;
    port1: string;
    port2: string;
  };
  const props = defineProps<{ resultData: any }>();

  const data1588Source = computed<Item1588[]>(() => {
    if (props.resultData?.dataType === 'ptp') {
      return (props.resultData?.devParamList || [])
        .map((dev) => {
          return (dev?.portParamList || []).map((p) => ({ ...p, devName: dev.devName }));
        })
        .flat();
    }
    return [];
  });
  const dataSyncSource = computed<ItemSync[]>(() => {
    if (props.resultData?.dataType === 'syncE') {
      return (props.resultData?.devParamList || [])
        .map((dev) => {
          return (dev?.portParamList || []).map((p) => ({ ...p, devName: dev.devName }));
        })
        .flat();
    }
    return [];
  });
  const dataLinkSource = computed<ItemLink[]>(() => {
    return props.resultData?.linkParamList || [];
  });
  const activeResultKey = ref('1588');

  const columns1588: TableProps['columns'] = [
    {
      dataIndex: 'devName',
      title: '网元名称',
    },
    {
      dataIndex: 'clockAccuracy',
      title: '时钟精度',
    },
    {
      dataIndex: 'offsetScaledLogVariance',
      title: '偏移缩放精度',
      minWidth: 160,
    },
    {
      dataIndex: 'clockIdentity',
      title: '时钟标识符',
    },
    {
      dataIndex: 'portName',
      title: '端口名称',
    },
    {
      dataIndex: 'portIdentity',
      title: '端口标识符',
    },
    {
      dataIndex: 'state',
      title: '端口状态',
    },
    // {
    //   dataIndex: 'ptpClockId',
    //   title: '时钟id',
    // },
    {
      dataIndex: 'ptpDomain',
      title: '域号',
    },
    {
      dataIndex: 'ptpClockClass',
      title: '时钟等级',
    },
    // {
    //   dataIndex: 'ptpPriority1',
    //   title: '优先级1',
    // },
    {
      dataIndex: 'timeSource',
      title: '时间源',
    },
    {
      dataIndex: 'accuracy',
      title: '精度预期',
    },
    {
      dataIndex: 'announceIntv',
      title: '通知间隔',
    },
    {
      dataIndex: 'syncIntv',
      title: '同步间隔',
    },
    {
      dataIndex: 'delayIntv',
      title: '延时间隔',
    },
  ];
  const columnsSync: TableProps['columns'] = [
    {
      dataIndex: 'devName',
      title: '网元名称',
    },
    {
      dataIndex: 'portName',
      title: '端口名称',
    },
    {
      dataIndex: 'portNumber',
      title: '端口号',
    },
    {
      dataIndex: 'enableTimeSync',
      title: '使能时钟同步',
    },
    {
      dataIndex: 'clockStatus',
      title: '时钟源状态',
    },
    {
      dataIndex: 'referenceClock',
      title: '参考时钟源',
    },
    {
      dataIndex: 'physicalLayerStatus',
      title: '物理层状态',
    },
    // {
    //   dataIndex: 'signalStyle',
    //   title: 'E1端口ais信号告警检测使能',
    // },
    {
      dataIndex: 'systemPriority',
      title: '系统优先级',
    },
    {
      dataIndex: 'outSSMLevel',
      title: '输出SSM等级',
    },
    {
      dataIndex: 'outClockID',
      title: '输出时钟ID',
    },
    {
      dataIndex: 'signalStyle',
      title: '型号类型',
    },
    {
      dataIndex: 'accuracy',
      title: '精度预期',
    },
  ];
  const linkSync: TableProps['columns'] = [
    {
      dataIndex: 'object',
      title: '链路名称',
    },
    {
      dataIndex: 'Dev1',
      title: '源网元',
    },
    {
      dataIndex: 'port1',
      title: '源端口',
    },
    {
      dataIndex: 'connectDev2',
      title: '宿网元',
    },
    {
      dataIndex: 'port1',
      title: '宿端口',
    },
    {
      dataIndex: 'linkType',
      title: '同步方式',
    },
  ];
</script>
