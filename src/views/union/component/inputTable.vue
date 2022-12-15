<template>
  <div>
    <div>
      <Button @click="handleAdd">添加</Button>
    </div>
    <div>
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1588" tab="1588">
          <Table :columns="columns1588" :dataSource="data1588Source" :pagination="false" />
        </TabPane>
        <TabPane key="sync" tab="sync">
          <Table :columns="columnsSync" :dataSource="dataSyncSource" :pagination="false" />
        </TabPane>
      </Tabs>
    </div>
    <div>
      <ResultTable />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Table, Input, Button, Select, Tabs, TabPane } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { h, ref, toRaw } from 'vue';
  import ResultTable from './resultTable.vue';

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
    aliasName: string;
    enableTimeSync: boolean; //使能时钟同步
    closeESMCSend: boolean; //关闭ESMC报文发送
    clockStatus: string; //时钟源状态
    referenceClock: boolean; //参考时钟源
    physicalLayerStatus: string; //物理层状态
    enablePhysicalSlaveStatus: boolean; //使能物理层Slave协商状态
    E1PortTimeslot: string; //E1端口时隙
    enbaleE1AISAlarmCheck: boolean; // E1端口ais信号告警检测使能
    systemPriority: number; //系统优先级int 0-255
    '2M-1Priority': number; //2M-1环优先级 int 0-255
    '2M-2Priority': number; // 2M-2环优先级int 0-255
    SSMMode: string; //SSM提取模式
    inSSMLevel: string; //输入SSM等级
    clockIDMode: string; //时钟ID提取模式
    inClockID: string; //输入时钟ID
    timeslot: string; //时隙
    signalStyle: string; //信号类型
    '2MPLL': string; //2M锁相环
    timeStamp: '时间戳';
    accuracy: number;
  };
  // defineProps<{}>();
  const emits = defineEmits(['change']);
  const data1588Source = ref<Item1588[]>([]);
  const dataSyncSource = ref<ItemSync[]>([]);
  const activeKey = ref('1588');

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
  const stateOptions = ['master', 'slave', 'passive', 'initializing', 'listening', 'premaster', 'uncalibrated', 'faulty'].map((d) => ({ label: d, value: d }));
  const packageTypeOptions = ['level2', 'level3'].map((d) => ({ label: d, value: d }));
  const broadcastTypeOptions = ['unicast', 'multicast'].map((d) => ({ label: d, value: d }));
  const delayMechanismOptions = ['E2E', 'P2P'].map((d) => ({ label: d, value: d }));
  const timeStampSendModeOptions = ['oneStep', 'twoStep'].map((d) => ({ label: d, value: d }));

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
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].devName = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'name',
      title: '端口名称',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].name = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'state',
      title: '端口状态',
      customRender({ index }) {
        return h(Select, {
          options: stateOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].state = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpClockId',
      title: '时钟id',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpClockId = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpDomain',
      title: '域号',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpDomain = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpProtocol',
      title: '协议标准',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpProtocol = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpClockClass',
      title: '时钟等级',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpClockClass = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpPriority1',
      title: '优先级1',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpPriority1 = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpPriority2',
      title: '优先级2',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpPriority2 = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'timeSource',
      title: '时间源',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].timeSource = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'announceIntv',
      title: '通知间隔',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].announceIntv = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'syncIntv',
      title: '同步间隔',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].syncIntv = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'delayIntv',
      title: '延时间隔',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].delayIntv = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'packageType',
      title: '报文封装类型',
      customRender({ index }) {
        return h(Select, {
          options: packageTypeOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].packageType = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'broadcastType',
      title: '报文播发类型',
      customRender({ index }) {
        return h(Select, {
          options: broadcastTypeOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].broadcastType = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'delayMechanism',
      title: '延时机制',
      customRender({ index }) {
        return h(Select, {
          options: delayMechanismOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].delayMechanism = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'timeStampSendMode',
      title: '时间戳发送模式',
      customRender({ index }) {
        return h(Select, {
          options: timeStampSendModeOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].timeStampSendMode = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'accuracy',
      title: '精度预期',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].accuracy = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
  ];
  const columnsSync: TableProps['columns'] = [
    {
      dataIndex: 'devName',
      title: '网元名称',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].devName = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'name',
      title: '端口名称',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].name = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'state',
      title: '使能时钟同步',
      customRender({ index }) {
        return h(Select, {
          options: stateOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].state = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpClockId',
      title: '时钟id',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpClockId = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpDomain',
      title: '域号',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpDomain = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpProtocol',
      title: '协议标准',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpProtocol = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpClockClass',
      title: '时钟等级',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpClockClass = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpPriority1',
      title: '优先级1',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpPriority1 = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'ptpPriority2',
      title: '优先级2',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpPriority2 = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'timeSource',
      title: '时间源',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].timeSource = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'announceIntv',
      title: '通知间隔',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].announceIntv = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'syncIntv',
      title: '同步间隔',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].syncIntv = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'delayIntv',
      title: '延时间隔',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].delayIntv = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'packageType',
      title: '报文封装类型',
      customRender({ index }) {
        return h(Select, {
          options: packageTypeOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].packageType = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'broadcastType',
      title: '报文播发类型',
      customRender({ index }) {
        return h(Select, {
          options: broadcastTypeOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].broadcastType = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'delayMechanism',
      title: '延时机制',
      customRender({ index }) {
        return h(Select, {
          options: delayMechanismOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].delayMechanism = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'timeStampSendMode',
      title: '时间戳发送模式',
      customRender({ index }) {
        return h(Select, {
          options: timeStampSendModeOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].timeStampSendMode = e?.toString?.() || '';
            emits('change', getFormat1588Data());
          },
        });
      },
    },
    {
      dataIndex: 'accuracy',
      title: '精度预期',
      customRender({ index }) {
        return h(Input, {
          'onUpdate:value'(e) {
            data1588Source.value[index].accuracy = e;
            emits('change', getFormat1588Data());
          },
        });
      },
    },
  ];
</script>
