<template>
  <Modal v-model:visible="visible" @ok="handleOk" :footer="null" width="800px" title="设置">
    <div class="p-1">
      <div class="flex bg-[rgb(240,240,240)] overflow-auto">
        <template v-for="(port, index) in portParamState" :key="port">
          <div :class="`p-1 border ${index === portIndex ? 'bg-white' : ''}`" @click="handlePortClick(index)">{{ port.portName }}</div>
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
        <div class="content mt-1 ml-1 bg-[rgb(240,240,240)] w-full p-4">
          <div v-if="typeIndex === 0">
            <Form :labelCol="{ span: 8 }">
              <div class="flex flex-wrap justify-between">
                <FormItem label="端口id" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].portId" />
                </FormItem>
                <FormItem label="优先级2" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].ptpPriority2" />
                </FormItem>
                <FormItem label="框-槽位-端口号" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].aliasName" />
                </FormItem>
                <FormItem label="时间源" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].timeSource" />
                </FormItem>
                <FormItem label="ptp端口状态" class="w-[48%]">
                  <Select :options="ptpPortStatusOptions" />
                </FormItem>
                <FormItem label="通知间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].announceIntv" />
                </FormItem>
                <FormItem label="使能状态" class="w-[48%]">
                  <Select :options="enableOptions" />
                </FormItem>
                <FormItem label="同步间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].syncIntv" />
                </FormItem>
                <FormItem label="时钟id" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].ptpClockId" />
                </FormItem>
                <FormItem label="延时间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].delayIntv" />
                </FormItem>
                <FormItem label="ptp域号" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].ptpDomain" />
                </FormItem>
                <FormItem label="报文封装类型" class="w-[48%]">
                  <Select :options="packageTypeOptions" v-model:value="portParamState[portIndex].packageType" />
                </FormItem>
                <FormItem label="ptp协议标准" class="w-[48%]">
                  <Input v-model:value="portParamState[portIndex].packageType" />
                </FormItem>
                <FormItem label="播发类型" class="w-[48%]">
                  <Select :options="broadcastTypeOptions" v-model:value="portParamState[portIndex].broadcastType" />
                </FormItem>
                <FormItem label="端口状态" class="w-[48%]">
                  <Select :options="portStateOptions" v-model:value="portParamState[portIndex].ptpPortStatus" />
                </FormItem>
                <FormItem label="延时机制" class="w-[48%]">
                  <Select :options="delayMechanismOptions" v-model:value="portParamState[portIndex].delayMechanism" />
                </FormItem>
                <FormItem label="ptp时钟等级" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].ptpClockClass" />
                </FormItem>
                <FormItem label="时间戳发送模式" class="w-[48%]">
                  <Select :options="timeStampSendModeOptions" v-model:value="portParamState[portIndex].timeStampSend" />
                </FormItem>
                <FormItem label="优先级1" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[portIndex].ptpPriority1" />
                </FormItem>
              </div>
            </Form>
            <div class="flex justify-end">
              <Button @click="handleOk">确定</Button>
            </div>
          </div>
          <div v-else>
            <Form :labelCol="{ span: 13 }">
              <div class="flex flex-wrap justify-between">
                <FormItem label="使能时钟同步" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].enableTimeSync" />
                </FormItem>
                <FormItem label="2M-1环优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[portIndex]['2M-1Pariotity']" />
                </FormItem>
                <FormItem label="关闭ESMC报文发送" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].closeESMCSend" />
                </FormItem>
                <FormItem label="2M-2环优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[portIndex]['2M-2Pariotity']" />
                </FormItem>
                <FormItem label="时钟源状态" class="w-[50%]">
                  <Select :options="clockStatusOptions" v-model:value="portParamState[portIndex].clockStatus" />
                </FormItem>
                <FormItem label="SSM提取模式" class="w-[50%]">
                  <Select :options="SSMModeOptions" v-model:value="portParamState[portIndex].SSMMode" />
                </FormItem>
                <FormItem label="参考时钟源" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].referenceClock" />
                </FormItem>
                <FormItem label="输入SSM等级" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].inSSMLevel" />
                </FormItem>
                <FormItem label="物理层状态" class="w-[50%]">
                  <Select :options="physicalLayerStatusOptions" v-model:value="portParamState[portIndex].physicalLayerStatus" />
                </FormItem>
                <FormItem label="时钟ID提取模式" class="w-[50%]">
                  <Select :options="clockIDModeOptions" v-model:value="portParamState[portIndex].clockIDMode" />
                </FormItem>
                <FormItem label="使能Slave物理层状态" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].enablePhysicalSlaveStatus" />
                </FormItem>
                <FormItem label="输入时钟ID" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].inClockID" />
                </FormItem>
                <FormItem label="E1端口时隙" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].E1PortTimeslot" />
                </FormItem>
                <FormItem label="时隙" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].timeSlot" />
                </FormItem>
                <FormItem label="E1端口ais信号告警检测使能" class="w-[50%]">
                  <Checkbox v-model:checked="portParamState[portIndex].enableE1AISAlarmCheck" />
                </FormItem>
                <FormItem label="信号类型" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex].signalStyle" />
                </FormItem>
                <FormItem label="系统优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[portIndex].systemPriority" />
                </FormItem>
                <FormItem label="2M锁相环" class="w-[50%]">
                  <Input v-model:value="portParamState[portIndex]['2MPLL']" />
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
    SSMModeOptions,
    clockIDModeOptions,
    clockStatusOptions,
    physicalLayerStatusOptions,
    portStateOptions,
    ptpPortStatusOptions,
    enableOptions,
    packageTypeOptions,
    broadcastTypeOptions,
    delayMechanismOptions,
    timeStampSendModeOptions,
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
    enableState: boolean;
    enableTimeSync: boolean;
    enableE1AISAlarmCheck: boolean;
    inClockID: string;
    inSSMLevel: string;
    packageType: string;
    physicalLayerStatus: string;
    portId: string;
    portName: string;
    ptpClockClass: string;
    ptpClockId: string;
    ptpDomain: string;
    ptpPortStatus: string;
    ptpPriority1: string;
    ptpPriority2: string;
    ptpPtofile: string;
    referenceClock: boolean;
    signalStyle: string;
    state: string;
    syncIntv: string;
    systemPriority: string;
    timeSlot: string;
    timeSource: string;
    timeStamp: string;
    timeStampSend: string;
  }
  const visible = ref(false);
  const typeList = ['1588', '同步以太'];
  const portIndex = ref(0);
  const typeIndex = ref(0);
  const props = defineProps<{
    device: {
      portList: Port[];
      object: string;
      type: string;
      ip: string;
      posX: number;
      posY: number;
    };
    port1588Param: I1588Params['ptp'];
  }>();
  const emits = defineEmits(['sure']);
  const portList = computed(() => {
    return props?.device?.portList || [];
  });
  const portParamState = ref<Port[]>(
    Array(999)
      .fill(0)
      .map(() => ({
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
        enableState: false,
        enableTimeSync: false,
        enableE1AISAlarmCheck: false,
        inClockID: '',
        inSSMLevel: '',
        packageType: '',
        physicalLayerStatus: '',
        portId: '',
        portName: '',
        ptpClockClass: '',
        ptpClockId: '',
        ptpDomain: '',
        ptpPortStatus: '',
        ptpPriority1: '',
        ptpPriority2: '',
        ptpPtofile: '',
        referenceClock: false,
        signalStyle: '',
        state: '',
        syncIntv: '',
        systemPriority: '',
        timeSlot: '',
        timeSource: '',
        timeStamp: '',
        timeStampSend: '',
      })),
  );
  const initPortParamState = () => {
    const t: Port[] = portList.value.map((port) => {
      const matchedParam = props.port1588Param.find((p) => p.portName === port.portName);
      // 没有匹配值，就用默认值
      if (!matchedParam) {
        return { ...port };
      }
      return {
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
  watch(
    () => props.port1588Param,
    () => {
      initPortParamState();
    },
  );
  const handleOk = () => {
    emits('sure', toRaw(portParamState.value));
    visible.value = false;
  };
  const handlePortClick = (index: number) => {
    portIndex.value = index;
  };
  const handleTypeClick = (index: number) => {
    typeIndex.value = index;
  };
  defineExpose({
    open() {
      visible.value = true;
      initPortParamState();
    },
    close() {},
  });
</script>
