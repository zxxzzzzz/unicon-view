<template>
  <div>
    <div>
      <Button @click="handleAdd">添加</Button>
    </div>
    <div>
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1588" tab="1588">
          <div class="overflow-auto w-full">
            <Table :columns="columns1588" :dataSource="data1588Source" :pagination="false" />
          </div>
        </TabPane>
        <TabPane key="sync" tab="sync">
          <div class="overflow-auto w-full">
            <Table :columns="columnsSync" :dataSource="dataSyncSource" :pagination="false" />
          </div>
        </TabPane>
      </Tabs>
    </div>
    <div class="flex justify-end mt-2">
      <Button @click="handleSend">发送</Button>
    </div>
    <div>
      <ResultTable :resultData="resultData" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Table, Input, Button, Select, Tabs, TabPane, Switch } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { h, ref, toRaw, computed } from 'vue';
  import ResultTable from './resultTable.vue';
  import { getUserData, getComBoxInfor } from '/@/api/union/index';
  import { useRequest } from 'vue-request';

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
    clockAccuracy: string;
    offsetScaledLogVariance: string;
    localPriority: string;
    portIdentity: string;
    clockIdentity: string;
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
    enableE1AISAlarmCheck: boolean; // E1端口ais信号告警检测使能
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
  const emits = defineEmits(['send']);
  const data1588Source = ref<Item1588[]>([]);
  const dataSyncSource = ref<ItemSync[]>([]);
  const activeKey = ref('1588');
  const { data: resultData, run: _getUserData } = useRequest(getUserData, { manual: true });
  const { data: comData, run: _getComBoxInfor } = useRequest(getComBoxInfor);

  const handleAdd = () => {
    if (activeKey.value === '1588') {
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
          clockAccuracy: '',
          offsetScaledLogVariance: '',
          localPriority: '',
          portIdentity: '',
          clockIdentity: '',
        },
      ];
    }
    if (activeKey.value === 'sync') {
      dataSyncSource.value = [
        ...dataSyncSource.value,
        {
          devName: '',
          name: '',
          aliasName: '',
          enableTimeSync: false, //使能时钟同步
          closeESMCSend: false, //关闭ESMC报文发送
          clockStatus: '', //时钟源状态
          referenceClock: false, //参考时钟源
          physicalLayerStatus: '', //物理层状态
          enablePhysicalSlaveStatus: false, //使能物理层Slave协商状态
          E1PortTimeslot: '', //E1端口时隙
          enableE1AISAlarmCheck: false, // E1端口ais信号告警检测使能
          systemPriority: 0, //系统优先级int 0-255
          '2M-1Priority': 0, //2M-1环优先级 int 0-255
          '2M-2Priority': 0, // 2M-2环优先级int 0-255
          SSMMode: '', //SSM提取模式
          inSSMLevel: '', //输入SSM等级
          clockIDMode: '', //时钟ID提取模式
          inClockID: '', //输入时钟ID
          timeslot: '', //时隙
          signalStyle: '', //信号类型
          '2MPLL': '', //2M锁相环
          timeStamp: '时间戳',
          accuracy: 0,
        },
      ];
    }
  };
  const handleSend = async () => {
    if (activeKey.value === 'sync') {
      const data = getFormatSyncData();
      const t = await _getUserData(data);
      emits('send', t);
    }
    if (activeKey.value === '1588') {
      const data = getFormat1588Data();
      const t = await _getUserData(data);
      emits('send', t);
    }
  };
  const stateOptions = ['master', 'slave', 'passive', 'initializing', 'listening', 'premaster', 'uncalibrated', 'faulty'].map((d) => ({ title: d, value: d }));
  // const packageTypeOptions = ['level2', 'level3'].map((d) => ({ title: d, value: d }));
  // const broadcastTypeOptions = ['unicast', 'multicast'].map((d) => ({ title: d, value: d }));
  // const delayMechanismOptions = ['E2E', 'P2P'].map((d) => ({ title: d, value: d }));
  const timeStampSendModeOptions = ['oneStep', 'twoStep'].map((d) => ({ title: d, value: d }));
  const clockStatusOptions = ['normal', 'abnormal'].map((d) => ({ title: d, value: d }));
  const physicalLayerStatusOptions = ['NA', 'Down', 'Up'].map((d) => ({ title: d, value: d }));
  // const SSMModeOptions = ['Auto', 'Manual'].map((d) => ({ title: d, value: d }));
  // const clockIDModeOptions = ['Auto', 'Manual'].map((d) => ({ title: d, value: d }));
  const devNameOptions = computed(() => {
    return (comData.value?.devList || []).map((d) => {
      return {
        title: d.devName,
        value: d.devName,
      };
    });
  });
  const getFormat1588Data = () => {
    return {
      dataType: 'ptp',
      devName: data1588Source.value?.[0]?.devName || '',
      portList: toRaw(data1588Source.value),
    };
  };
  const getFormatSyncData = () => {
    return {
      dataType: 'syncE',
      devName: dataSyncSource.value?.[0]?.devName || '',
      portList: toRaw(dataSyncSource.value),
    };
  };
  const columns1588: TableProps['columns'] = [
    {
      dataIndex: 'devName',
      title: '网元名称',
      customRender({ index }) {
        return h(Select, {
          value: data1588Source.value[index].devName,
          options: devNameOptions.value,
          class: 'w-50',
          'onUpdate:value'(e) {
            data1588Source.value[index].devName = e?.toString?.() || '';
          },
        });
      },
    },
    {
      dataIndex: 'name',
      title: '端口名称',
      customRender({ index }) {
        return h(Select, {
          class: 'w-40',
          value: data1588Source.value[index].name,
          options: ((comData.value?.devList || []).find((d) => d.devName === data1588Source.value[index].devName)?.portList || []).map((p) => {
            return {
              title: p.portName,
              value: p.portName,
            };
          }),
          'onUpdate:value'(e) {
            data1588Source.value[index].name = e?.toString?.() || '';
          },
        });
      },
    },
    {
      dataIndex: 'state',
      title: '端口状态',
      customRender({ index }) {
        return h(Select, {
          value: data1588Source.value[index].state,
          options: stateOptions,
          class: 'w-20',
          'onUpdate:value'(e) {
            data1588Source.value[index].state = e?.toString?.() || '';
          },
        });
      },
    },
    // {
    //   dataIndex: 'ptpClockId',
    //   title: '时钟id',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-20',
    //       value: data1588Source.value[index].ptpClockId,
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].ptpClockId = e;
    //       },
    //     });
    //   },
    // },
    {
      dataIndex: 'ptpDomain',
      title: '域号',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].ptpDomain,
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpDomain = e;
          },
        });
      },
    },
    // {
    //   dataIndex: 'ptpProtocol',
    //   title: '协议标准',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-20',
    //       value: data1588Source.value[index].ptpProtocol,
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].ptpProtocol = e;
    //       },
    //     });
    //   },
    // },
    {
      dataIndex: 'ptpClockClass',
      title: '时钟等级',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].ptpClockClass,
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpClockClass = e;
          },
        });
      },
    },
    {
      dataIndex: 'localPriority',
      title: '本地优先级',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].localPriority,
          'onUpdate:value'(e) {
            data1588Source.value[index].localPriority = e;
          },
        });
      },
    },
    {
      dataIndex: 'ptpPriority1',
      title: '优先级1',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].ptpPriority1,
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpPriority1 = e;
          },
        });
      },
    },
    {
      dataIndex: 'ptpPriority2',
      title: '优先级2',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].ptpPriority2,
          'onUpdate:value'(e) {
            data1588Source.value[index].ptpPriority2 = e;
          },
        });
      },
    },
    {
      dataIndex: 'timeSource',
      title: '时间源',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].timeSource,
          'onUpdate:value'(e) {
            data1588Source.value[index].timeSource = e;
          },
        });
      },
    },
    {
      dataIndex: 'clockAccuracy',
      title: '时钟精度',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].clockAccuracy,
          'onUpdate:value'(e) {
            data1588Source.value[index].clockAccuracy = e;
          },
        });
      },
    },
    {
      dataIndex: 'offsetScaledLogVariance',
      title: '偏移缩放精度',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].offsetScaledLogVariance,
          'onUpdate:value'(e) {
            data1588Source.value[index].offsetScaledLogVariance = e;
          },
        });
      },
    },
    {
      dataIndex: 'clockIdentity',
      title: '时钟标识符',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].clockIdentity,
          'onUpdate:value'(e) {
            data1588Source.value[index].clockIdentity = e;
          },
        });
      },
    },
    {
      dataIndex: 'portIdentity',
      title: '端口标识符',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: data1588Source.value[index].portIdentity,
          'onUpdate:value'(e) {
            data1588Source.value[index].portIdentity = e;
          },
        });
      },
    },
    // {
    //   dataIndex: 'announceIntv',
    //   title: '通知间隔',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-20',
    //       value: data1588Source.value[index].announceIntv,
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].announceIntv = e;
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'syncIntv',
    //   title: '同步间隔',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-20',
    //       value: data1588Source.value[index].syncIntv,
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].syncIntv = e;
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'delayIntv',
    //   title: '延时间隔',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-20',
    //       value: data1588Source.value[index].delayIntv,
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].delayIntv = e;
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'packageType',
    //   title: '报文封装类型',
    //   customRender({ index }) {
    //     return h(Select, {
    //       value: data1588Source.value[index].packageType,
    //       options: packageTypeOptions,
    //       class: '!w-20',
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].packageType = e?.toString?.() || '';
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'broadcastType',
    //   title: '报文播发类型',
    //   customRender({ index }) {
    //     return h(Select, {
    //       value: data1588Source.value[index].broadcastType,
    //       options: broadcastTypeOptions,
    //       class: '!w-20',
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].broadcastType = e?.toString?.() || '';
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'delayMechanism',
    //   title: '延时机制',
    //   customRender({ index }) {
    //     return h(Select, {
    //       value: data1588Source.value[index].delayMechanism,
    //       options: delayMechanismOptions,
    //       class: '!w-20',
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].delayMechanism = e?.toString?.() || '';
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'timeStampSendMode',
    //   title: '时间戳发送模式',
    //   customRender({ index }) {
    //     return h(Select, {
    //       value: data1588Source.value[index].timeStampSendMode,
    //       options: timeStampSendModeOptions,
    //       class: '!w-20',
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].timeStampSendMode = e?.toString?.() || '';
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'accuracy',
    //   title: '精度预期',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-20',
    //       value: data1588Source.value[index].accuracy,
    //       'onUpdate:value'(e) {
    //         data1588Source.value[index].accuracy = e;
    //       },
    //     });
    //   },
    // },
  ];
  // 同步的
  const columnsSync: TableProps['columns'] = [
    {
      dataIndex: 'devName',
      title: '网元名称',
      customRender({ index }) {
        return h(Select, {
          options: devNameOptions.value,
          class: '!w-50',
          value: dataSyncSource.value[index].devName,
          'onUpdate:value'(e) {
            dataSyncSource.value[index].devName = e?.toString?.() || '';
          },
        });
      },
    },
    {
      dataIndex: 'name',
      title: '端口名称',
      customRender({ index }) {
        return h(Select, {
          options: ((comData.value?.devList || []).find((d) => d.devName === dataSyncSource.value[index]?.devName)?.portList || []).map((p) => {
            return {
              title: p.portName,
              value: p.portName,
            };
          }),
          class: '!w-40',
          value: dataSyncSource.value[index].name,
          'onUpdate:value'(e) {
            dataSyncSource.value[index].name = e?.toString?.() || '';
          },
        });
      },
    },
    {
      dataIndex: 'enableTimeSync',
      title: '使能时钟同步',
      customRender({ index }) {
        return h(Switch, {
          checked: dataSyncSource.value[index].enableTimeSync,
          size: 'small',
          'onUpdate:checked'(e) {
            dataSyncSource.value[index].enableTimeSync = e.valueOf() as boolean;
          },
        });
      },
    },
    // {
    //   dataIndex: 'closeESMCSend',
    //   title: '关闭ESMC报文发送',
    //   customRender({ index }) {
    //     return h(Switch, {
    //       checked: dataSyncSource.value[index].closeESMCSend,
    //       size: 'small',
    //       'onUpdate:checked'(e) {
    //         dataSyncSource.value[index].closeESMCSend = e.valueOf() as boolean;
    //       },
    //     });
    //   },
    // },
    {
      dataIndex: 'clockStatus',
      title: '时钟源状态',
      customRender({ index }) {
        return h(Select, {
          class: '!w-20',
          value: dataSyncSource.value[index].clockStatus,
          options: clockStatusOptions,
          'onUpdate:value'(e) {
            dataSyncSource.value[index].clockStatus = e?.toString?.() || '';
          },
        });
      },
    },
    {
      dataIndex: 'referenceClock',
      title: '参考时钟源',
      customRender({ index }) {
        return h(Switch, {
          checked: dataSyncSource.value[index].referenceClock,
          size: 'small',
          'onUpdate:checked'(e) {
            dataSyncSource.value[index].referenceClock = e.valueOf() as boolean;
          },
        });
      },
    },
    {
      dataIndex: 'physicalLayerStatus',
      title: '物理层状态',
      customRender({ index }) {
        return h(Select, {
          value: dataSyncSource.value[index].physicalLayerStatus,
          class: '!w-20',
          options: physicalLayerStatusOptions,
          'onUpdate:value'(e) {
            dataSyncSource.value[index].physicalLayerStatus = e?.toString?.() || '';
          },
        });
      },
    },
    // {
    //   dataIndex: 'enablePhysicalSlaveStatus',
    //   title: '使能物理层Slave协商状态',
    //   customRender({ index }) {
    //     return h(Switch, {
    //       checked: dataSyncSource.value[index].enablePhysicalSlaveStatus,
    //       size: 'small',
    //       'onUpdate:checked'(e) {
    //         dataSyncSource.value[index].enablePhysicalSlaveStatus = e.valueOf() as boolean;
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'E1PortTimeslot',
    //   title: 'E1端口时隙',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-40',
    //       value: dataSyncSource.value[index].E1PortTimeslot,
    //       'onUpdate:value'(e) {
    //         dataSyncSource.value[index].E1PortTimeslot = e;
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'enableE1AISAlarmCheck',
    //   title: 'E1端口ais信号告警检测使能',
    //   customRender({ index }) {
    //     return h(Switch, {
    //       checked: dataSyncSource.value[index].enableE1AISAlarmCheck,
    //       size: 'small',
    //       'onUpdate:checked'(e) {
    //         dataSyncSource.value[index].enableE1AISAlarmCheck = e.valueOf() as boolean;
    //       },
    //     });
    //   },
    // },
    {
      dataIndex: 'systemPriority',
      title: '系统优先级',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: dataSyncSource.value[index].systemPriority,
          'onUpdate:value'(e) {
            dataSyncSource.value[index].systemPriority = parseFloat(e);
          },
        });
      },
    },
    // {
    //   dataIndex: '2M-1Priority',
    //   title: '2M-1环优先级',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-20',
    //       value: dataSyncSource.value[index]['2M-1Priority'],
    //       'onUpdate:value'(e) {
    //         dataSyncSource.value[index]['2M-1Priority'] = parseFloat(e);
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: '2M-2Priority',
    //   title: '2M-2环优先级',
    //   customRender({ index }) {
    //     return h(Input, {
    //       class: '!w-20',
    //       value: dataSyncSource.value[index]['2M-2Priority'],
    //       'onUpdate:value'(e) {
    //         dataSyncSource.value[index]['2M-2Priority'] = parseFloat(e);
    //       },
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'SSMMode',
    //   title: 'SSM提取模式',
    //   customRender({ index }) {
    //     return h(Select, {
    //       class: '!w-20',
    //       value: dataSyncSource.value[index].SSMMode,
    //       options: SSMModeOptions,
    //       'onUpdate:value'(e) {
    //         dataSyncSource.value[index].SSMMode = e?.toString?.() || '';
    //       },
    //     });
    //   },
    // },
    {
      dataIndex: 'inSSMLevel',
      title: '输入SSM等级',
      customRender({ index }) {
        return h(Input, {
          class: '!w-20',
          value: dataSyncSource.value[index].inSSMLevel,
          'onUpdate:value'(e) {
            dataSyncSource.value[index].inSSMLevel = e;
          },
        });
      },
    },
    // {
    //   dataIndex: 'clockIDMode',
    //   title: '时钟ID提取模式',
    //   customRender({ index }) {
    //     return h(Select, {
    //       value: dataSyncSource.value[index].clockIDMode,
    //       options: clockIDModeOptions,
    //       class: '!w-20',
    //       'onUpdate:value'(e) {
    //         dataSyncSource.value[index].clockIDMode = e?.toString?.() || '';
    //       },
    //     });
    //   },
    // },
    {
      dataIndex: 'inClockID',
      title: '输入时钟ID',
      customRender({ index }) {
        return h(Select, {
          value: dataSyncSource.value[index].inClockID,
          options: timeStampSendModeOptions,
          class: '!w-20',
          'onUpdate:value'(e) {
            dataSyncSource.value[index].inClockID = e?.toString?.() || '';
          },
        });
      },
    },
    // {
    //   dataIndex: 'accuracy',
    //   title: '精度预期',
    //   customRender({ index }) {
    //     return h(Input, {
    //       value: dataSyncSource.value[index].accuracy,
    //       class: '!w-20',
    //       'onUpdate:value'(e) {
    //         dataSyncSource.value[index].accuracy = parseFloat(e);
    //       },
    //     });
    //   },
    // },
  ];
</script>
