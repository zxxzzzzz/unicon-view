<template>
  <Modal v-model:visible="visible" @ok="handleOk" :footer="null" width="800px" title="设置">
    <div class="p-1">
      <div class="flex bg-[rgb(220,220,220)] overflow-auto">
        <div :class="`py-1 px-2 border-2 font-bold ${typeIndex === 2 ? 'bg-white' : ''}`" @click="handleDevAttrClick">网元属性</div>
        <template v-for="(port, index) in portParamState" :key="port">
          <div :class="`py-1 px-2 font-bold border-2 ${index === portIndex && typeIndex !== 2 ? 'bg-white' : ''}`" @click="handlePortClick(index)">{{ port.portName }}</div>
        </template>
      </div>
      <div class="main flex">
        <div class="bg-[rgb(240,240,240)] w-20">
          <template v-for="(text, index) in typeList" :key="text">
            <div :class="`h-16 justify-center items-center flex ${index === typeIndex ? 'bg-white' : ''}`" @click="handleTypeClick(index)">
              <div>{{ text }}</div>
            </div>
          </template>
        </div>
        <div class="content mt-1 ml-1 bg-[rgb(240,240,240)] w-full p-4" v-if="portParamState?.length">
          <div v-if="typeIndex === 0">
            <Form :labelCol="{ span: 8 }">
              <div class="flex flex-wrap justify-between">
                <FormItem label="连接对象" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].connDevPort" @change="handleChange" :disabled="true" />
                </FormItem>
                <FormItem label="端口号" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].portNumber" @change="handleChange" />
                </FormItem>
                <FormItem label="优先级2" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].ptpPriority2" @change="handleChange" />
                </FormItem>
                <FormItem label="框-槽位-端口号" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].aliasName" @change="handleChange" />
                </FormItem>
                <FormItem label="时间源" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].timeSource" @change="handleChange" />
                </FormItem>
                <!-- <FormItem label="ptp端口状态" class="w-[48%]">
                  <Select :options="ptpPortStatusOptions" v-model:value="portParamState[portIndex].ptpPortStatus" />
                </FormItem> -->
                <FormItem label="通知间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].announceIntv" @change="handleChange" />
                </FormItem>
                <FormItem label="使能状态" class="w-[48%]">
                  <Select :options="enableOptions" v-model:value="portParamState[portIndex].enableState" @change="handleChange" />
                </FormItem>
                <FormItem label="同步间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].syncIntv" @change="handleChange" />
                </FormItem>
                <FormItem label="端口标识符" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].portIdentity" @change="handleChange" />
                </FormItem>
                <FormItem label="延时间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].delayIntv" @change="handleChange" />
                </FormItem>
                <FormItem label="ptp域号" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].ptpDomain" @change="handleChange" />
                </FormItem>
                <FormItem label="本地优先级" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].localPriority" @change="handleChange" />
                </FormItem>
                <!-- <FormItem label="播发类型" class="w-[48%]">
                  <Select :options="broadcastTypeOptions" v-model:value="portParamState[portIndex].broadcastType" @change="handleChange" />
                </FormItem> -->
                <FormItem label="端口状态" class="w-[48%]">
                  <Select :options="portStateOptions" v-model:value="portParamState[portIndex].ptpPortStatus" @change="handleChange" />
                </FormItem>
                <FormItem label="延时机制" class="w-[48%]">
                  <Select :options="delayMechanismOptions" v-model:value="portParamState[portIndex].delayMechanism" @change="handleChange" />
                </FormItem>
                <FormItem label="ptp时钟等级" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].ptpClockClass" @change="handleChange" />
                </FormItem>
                <!-- <FormItem label="时间戳发送模式" class="w-[48%]">
                  <Select :options="timeStampSendModeOptions" v-model:value="portParamState[portIndex].timeStampSend" @change="handleChange" />
                </FormItem> -->
                <FormItem label="优先级1" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].ptpPriority1" @change="handleChange" />
                </FormItem>
                <FormItem label="精度预期" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].precisionExpect" @change="handleChange" />
                </FormItem>
              </div>
            </Form>
            <div class="flex justify-end">
              <Button @click="handleOk">确定</Button>
            </div>
          </div>
          <div v-else-if="typeIndex === 1">
            <Form :labelCol="{ span: 13 }">
              <div class="flex flex-wrap justify-between">
                <FormItem label="使能时钟同步" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].enableTimeSync" @update:checked="handleChange" />
                </FormItem>
                <!-- <FormItem label="2M-1环优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[portIndex]['2M-1Pariotity']" @change="handleChange" />
                </FormItem> -->
                <!-- <FormItem label="关闭ESMC报文发送" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].closeESMCSend" @update:checked="handleChange" />
                </FormItem> -->
                <!-- <FormItem label="2M-2环优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[portIndex]['2M-2Pariotity']" @change="handleChange" />
                </FormItem> -->
                <FormItem label="时钟源状态" class="w-[50%]">
                  <Select :options="clockStatusOptions" v-model:value="portParamState[portIndex].clockStatus" @change="handleChange" />
                </FormItem>
                <!-- <FormItem label="SSM提取模式" class="w-[50%]">
                  <Select :options="SSMModeOptions" v-model:value="portParamState[portIndex].SSMMode" @change="handleChange" />
                </FormItem> -->
                <FormItem label="参考时钟源" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].referenceClock" @update:checked="handleChange" />
                </FormItem>
                <FormItem label="输入SSM等级" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].inSSMLevel" @change="handleChange" />
                </FormItem>
                <FormItem label="物理层状态" class="w-[50%]">
                  <Select :options="physicalLayerStatusOptions" v-model:value="portParamState[portIndex].physicalLayerStatus" @change="handleChange" />
                </FormItem>
                <!-- <FormItem label="时钟ID提取模式" class="w-[50%]">
                  <Select :options="clockIDModeOptions" v-model:value="portParamState[portIndex].clockIDMode" @change="handleChange" />
                </FormItem> -->
                <!-- <FormItem label="使能Slave物理层状态" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].enablePhysicalSlaveStatus" @update:checked="handleChange" />
                </FormItem> -->
                <FormItem label="输入时钟ID" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].inClockID" @change="handleChange" />
                </FormItem>
                <!-- <FormItem label="E1端口时隙" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].E1PortTimeslot" @change="handleChange" />
                </FormItem> -->
                <FormItem label="精度预期" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].syncEPrecisionExpect" @change="handleChange" />
                </FormItem>
                <!-- <FormItem label="E1端口ais信号告警检测使能" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].enableE1AISAlarmCheck" @update:checked="handleChange" />
                </FormItem> -->
                <FormItem label="信号类型" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].signalStyle" @change="handleChange" />
                </FormItem>
                <FormItem label="系统优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[portIndex].systemPriority" @change="handleChange" />
                </FormItem>
                <!-- <FormItem label="2M锁相环" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex]['2MPLL']" @change="handleChange" />
                </FormItem> -->
              </div>
            </Form>
            <div class="flex justify-end">
              <Button @click="handleOk">确定</Button>
            </div>
          </div>
          <div v-else>
            <Form :labelCol="{ span: 13 }">
              <div class="flex flex-wrap justify-between">
                <FormItem label="时钟精度" class="w-[50%]">
                  <Input v-model:value="devAttr.clockAccuracy" />
                </FormItem>
                <FormItem label="偏移缩放精度" class="w-[50%]">
                  <Input v-model:value="devAttr.offsetScaledLogVariance" />
                </FormItem>
                <FormItem label="时钟标识符" class="w-[50%]">
                  <Input v-model:value="devAttr.clockIdentity" />
                </FormItem>
              </div>
            </Form>
            <div class="flex justify-end">
              <Button @click="handleOk">确定</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
  import { Modal, Form, FormItem, Input, Checkbox, Select, InputNumber, Button } from 'ant-design-vue';
  import type { I1588Params } from '/@/api/union/index';
  import { computed, ref, watch, toRaw } from 'vue';
  import {
    // SSMModeOptions,
    // clockIDModeOptions,
    clockStatusOptions,
    physicalLayerStatusOptions,
    portStateOptions,
    // ptpPortStatusOptions,
    enableOptions,
    // packageTypeOptions,
    // broadcastTypeOptions,
    delayMechanismOptions,
    // timeStampSendModeOptions,
  } from './option';

  interface Port {
    '2M-1Pariotity': string;
    '2M-2Pariotity': string;
    '2MPLL': string;
    E1PortTimeslot: string;
    SSMMode: string;
    aliasName: string;
    announceIntv: string;
    broadcastType: string;
    clockIDMode: string;
    clockStatus: string;
    closeESMCSend: boolean;
    delayIntv: string;
    delayMechanism: string;
    enablePhysicalSlaveStatus: boolean;
    enableState: string;
    enableTimeSync: boolean;
    enableE1AISAlarmCheck: boolean;
    inClockID: string;
    inSSMLevel: string;
    packageType: string;
    physicalLayerStatus: string;
    syncEPrecisionExpect: string;
    localPriority: string;
    portId: string;
    portIdentity: string;
    portNumber: string;
    precisionExpect: string;
    connDevPort: string;
    portName: string;
    ptpClockClass: string;
    ptpClockId: string;
    ptpDomain: string;
    ptpPortStatus: string;
    ptpPriority1: string;
    ptpPriority2: string;
    referenceClock: boolean;
    signalStyle: string;
    state: string;
    syncIntv: string;
    systemPriority: string;
    timeSlot: string;
    timeSource: string;
    timeStamp: string;
    timeStampSend: string;
    accuracy: string;
  }
  const _initPort = {
    '2M-1Pariotity': '',
    '2M-2Pariotity': '',
    '2MPLL': '',
    E1PortTimeslot: '',
    SSMMode: '',
    aliasName: '',
    announceIntv: '',
    broadcastType: '',
    clockIDMode: '',
    clockStatus: '',
    closeESMCSend: false,
    delayIntv: '',
    delayMechanism: '',
    enablePhysicalSlaveStatus: false,
    enableState: '',
    enableTimeSync: false,
    enableE1AISAlarmCheck: false,
    inClockID: '',
    inSSMLevel: '',
    packageType: '',
    portId: '',
    portIdentity: '',
    physicalLayerStatus: '',
    syncEPrecisionExpect: '',
    localPriority: '',
    portNumber: '',
    precisionExpect: '',
    connDevPort: '',
    portName: '',
    ptpClockClass: '',
    ptpClockId: '',
    ptpDomain: '',
    ptpPortStatus: '',
    ptpPriority1: '',
    ptpPriority2: '',
    referenceClock: false,
    signalStyle: '',
    state: '',
    syncIntv: '',
    systemPriority: '',
    timeSlot: '',
    timeSource: '',
    timeStamp: '',
    timeStampSend: '',
    accuracy: '',
  };
  enum PARAM_TYPE {
    _1588,
    sync,
  }
  const visible = ref(false);
  const typeList = ['1588', '同步以太'];
  const portIndex = ref(0);
  const typeAndPortIndexMarkList = ref<{ type: PARAM_TYPE; portIndex: number }[]>([]);
  const typeIndex = ref(0);
  const props = defineProps<{
    device: {
      portList: Port[];
      id: string;
      type: string;
      ip: string;
    };
    port1588Param: I1588Params['ptp'];
  }>();
  const emits = defineEmits(['sure']);
  const portList = computed(() => {
    return (props?.device?.portList || []).filter((d) => d.aliasName);
  });
  // 网元属性
  const devAttr = ref({
    offsetScaledLogVariance: '',
    clockIdentity: '',
    clockAccuracy: '',
  });
  const portParamState = ref<Port[]>([]);
  const initPortParamState = () => {
    const t: Port[] = portList.value.map((port) => {
      const matchedParam = props.port1588Param.find((p) => p.portName === port.portName);
      // 没有匹配值，就用默认值
      if (!matchedParam) {
        return { ...port };
      }
      return {
        ..._initPort,
        ...port,
        ...Object.keys(matchedParam).reduce((re, key) => {
          if (matchedParam[key] !== '') {
            return {
              ...re,
              // 把字符串true false转换成布尔值
              [key]: ['true', 'false'].includes(matchedParam[key]) ? !!matchedParam[key] : matchedParam[key],
            };
          }
          return re;
        }, {} as Partial<Port>),
      };
    });
    portParamState.value = t;
  };
  const initDevAttr = () => {
    devAttr.value = {
      offsetScaledLogVariance: '',
      clockIdentity: '',
      clockAccuracy: '',
    };
  };
  watch(
    () => props.port1588Param,
    () => {
      initPortParamState();
    },
  );
  const handleOk = () => {
    const _1588IndexList = typeAndPortIndexMarkList.value.filter((d) => d.type === PARAM_TYPE._1588).map((d) => d.portIndex);
    const syncIndexList = typeAndPortIndexMarkList.value.filter((d) => d.type === PARAM_TYPE.sync).map((d) => d.portIndex);
    const _1588Param = portParamState.value.filter((_p, index) => _1588IndexList.includes(index));
    const syncParam = portParamState.value.filter((_p, index) => syncIndexList.includes(index));
    console.log(_1588Param, '_1588Param');
    emits('sure', {
      _1588: toRaw(_1588Param),
      sync: toRaw(syncParam),
      devAttr: toRaw(devAttr.value),
    });
    visible.value = false;
  };
  const handleChange = () => {
    if (typeIndex.value === 0) {
      typeAndPortIndexMarkList.value = [...typeAndPortIndexMarkList.value, { type: PARAM_TYPE._1588, portIndex: portIndex.value }];
    }
    if (typeIndex.value === 1) {
      typeAndPortIndexMarkList.value = [...typeAndPortIndexMarkList.value, { type: PARAM_TYPE.sync, portIndex: portIndex.value }];
    }
  };
  const handlePortClick = (index: number) => {
    portIndex.value = index;
    typeIndex.value = 0;
  };
  const handleTypeClick = (index: number) => {
    typeIndex.value = index;
  };
  const handleDevAttrClick = () => {
    typeIndex.value = 2;
  };
  defineExpose({
    open() {
      visible.value = true;
      initPortParamState();
      initDevAttr();
      typeIndex.value = 0;
      portIndex.value = 0;
    },
    close() {},
  });
</script>
