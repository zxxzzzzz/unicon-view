<template>
  <Modal v-model:visible="visible" @ok="handleOk" :closable="false" :footer="null" width="800px">
    <div class="p-1">
      <div class="flex bg-[rgb(240,240,240)]">
        <template v-for="(port, index) in portList" :key="port">
          <div
            :class="`p-1 border ${index === portIndex ? 'bg-white' : ''}`"
            @click="handlePortClick(index)"
            >{{ port }}</div
          >
        </template>
      </div>
      <div class="main flex">
        <div class="bg-[rgb(240,240,240)] w-20">
          <template v-for="(text, index) in typeList" :key="text">
            <div
              :class="`h-16 justify-center items-center flex ${
                index === typeIndex ? 'bg-white' : ''
              }`"
              @click="handleTypeClick(index)"
            >
              <div>{{ text }}</div>
            </div>
          </template>
        </div>
        <div class="content mt-1 ml-1 bg-[rgb(240,240,240)] w-full p-4">
          <div v-if="typeIndex === 0">
            <Form :labelCol="{ span: 8 }">
              <div class="flex flex-wrap justify-between">
                <FormItem label="端口id" class="w-[48%]">
                  <Input v-model:value="portParamState[0].name" />
                </FormItem>
                <FormItem label="优先级2" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[0].ptpPriority2" />
                </FormItem>
                <FormItem label="框-槽位-端口号" class="w-[48%]">
                  <Input v-model:value="portParamState[0].aliasName" />
                </FormItem>
                <FormItem label="时间源" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[0].timeSource" />
                </FormItem>
                <FormItem label="ptp端口状态" class="w-[48%]">
                  <Select :options="ptpPortStatusOptions" />
                </FormItem>
                <FormItem label="通知间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[0].announceIntv" />
                </FormItem>
                <FormItem label="使能状态" class="w-[48%]">
                  <Select :options="enableOptions" />
                </FormItem>
                <FormItem label="同步间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[0].syncIntv" />
                </FormItem>
                <FormItem label="时钟id" class="w-[48%]">
                  <Input v-model:value="portParamState[0].ptpClockId" />
                </FormItem>
                <FormItem label="延时间隔" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[0].delayIntv" />
                </FormItem>
                <FormItem label="ptp域号" class="w-[48%]">
                  <Input v-model:value="portParamState[0].ptpDomain" />
                </FormItem>
                <FormItem label="报文封装类型" class="w-[48%]">
                  <Select :options="packageTypeOptions" />
                </FormItem>
                <FormItem label="ptp协议标准" class="w-[48%]">
                  <Input v-model:value="portParamState[0].packageType" />
                </FormItem>
                <FormItem label="播发类型" class="w-[48%]">
                  <Select :options="broadcastTypeOptions" />
                </FormItem>
                <FormItem label="端口状态" class="w-[48%]">
                  <Select :options="portStateOptions" />
                </FormItem>
                <FormItem label="延时机制" class="w-[48%]">
                  <Select :options="delayMechanismOptions" />
                </FormItem>
                <FormItem label="ptp时钟等级" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[0].ptpClockClass" />
                </FormItem>
                <FormItem label="时间戳发送模式" class="w-[48%]">
                  <Select :options="timeStampSendModeOptions" />
                </FormItem>
                <FormItem label="优先级1" class="w-[48%]">
                  <InputNumber v-model:value="portParamState[0].ptpPriority1" />
                </FormItem>
              </div>
            </Form>
          </div>
          <div v-else>
            <Form :labelCol="{ span: 13 }">
              <div class="flex flex-wrap justify-between">
                <FormItem label="使能时钟同步" class="w-[50%]">
                  <Checkbox v-model:value="portParamState[0].ptpPriority1" />
                </FormItem>
                <FormItem label="2M-1环优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[0].timeSource" />
                </FormItem>
                <FormItem label="关闭ESMC报文发送" class="w-[50%]">
                  <Checkbox v-model:value="portParamState[0].ptpPriority1" />
                </FormItem>
                <FormItem label="2M-2环优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[0].announceIntv" />
                </FormItem>
                <FormItem label="时钟源状态" class="w-[50%]">
                  <Select :options="clockStatusOptions" />
                </FormItem>
                <FormItem label="SSM提取模式" class="w-[50%]">
                  <Select :options="SSMModeOptions" />
                </FormItem>
                <FormItem label="参考时钟源" class="w-[50%]">
                  <Checkbox v-model:value="portParamState[0].ptpPriority1" />
                </FormItem>
                <FormItem label="输入SSM等级" class="w-[50%]">
                  <Input v-model:value="portParamState[0].delayIntv" />
                </FormItem>
                <FormItem label="物理层状态" class="w-[50%]">
                  <Select :options="physicalLayerStatusOptions" />
                </FormItem>
                <FormItem label="时钟ID提取模式" class="w-[50%]">
                  <Select :options="clockIDModeOptions" />
                </FormItem>
                <FormItem label="使能Slave物理层状态" class="w-[50%]">
                  <Checkbox v-model:value="portParamState[0].ptpPriority1" />
                </FormItem>
                <FormItem label="输入时钟ID" class="w-[50%]">
                  <Input v-model:value="portParamState[0].broadcastType" />
                </FormItem>
                <FormItem label="E1端口时隙" class="w-[50%]">
                  <Input v-model:value="portParamState[0].ptpClockClass" />
                </FormItem>
                <FormItem label="时隙" class="w-[50%]">
                  <Input v-model:value="portParamState[0].delayMechanism" />
                </FormItem>
                <FormItem label="E1端口ais信号告警检测使能" class="w-[50%]">
                  <Checkbox v-model:value="portParamState[0].ptpPriority1" />
                </FormItem>
                <FormItem label="信号类型" class="w-[50%]">
                  <Input v-model:value="portParamState[0].delayMechanism" />
                </FormItem>
                <FormItem label="系统优先级" class="w-[50%]">
                  <InputNumber v-model:value="portParamState[0].ptpPriority2" />
                </FormItem>
                <FormItem label="2M锁相环" class="w-[50%]">
                  <Input v-model:value="portParamState[0].delayMechanism" />
                </FormItem>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
  import {
    Modal,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Card,
    Input,
    Checkbox,
    Select,
    InputNumber,
  } from 'ant-design-vue';
  import type { I1588Params } from '/@/api/union/index';
  import { computed, reactive, Ref, ref, watch } from 'vue';
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
  const visible = ref(false);
  const typeList = ['1588', '同步以太'];
  const portIndex = ref(0);
  const typeIndex = ref(0);
  const props = defineProps<{
    device: {
      portList: string[];
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
  const portParamState = reactive(
    Array(10)
      .fill(0)
      .map(() => ({
        name: '',
        aliasName: '',
        state: '',
        enableState: '',
        ptpClockId: '', //时钟id
        ptpDomain: '', //域号
        ptpClockClass: '', //时钟等级
        ptpPriority1: '', //优先级1
        ptpPriority2: '', //优先级2
        timeSource: '', //时间源
        announceIntv: '', //通知间隔
        syncIntv: '', //同步间隔
        delayIntv: '', //延时间隔
        packageType: '', //报文封装类型
        broadcastType: '', //报文播发类型
        delayMechanism: '', //延时机制
      })),
  );
  watch(
    () => props.port1588Param,
    () => {
      portList.value.map((port, index) => {
        const matchedParam = props.port1588Param.find((p) => p.name === port) || {
          name: '',
          aliasName: '',
          state: '',
          enableState: '',
          ptpClockId: '', //时钟id
          ptpDomain: '', //域号
          ptpClockClass: '', //时钟等级
          ptpPriority1: '', //优先级1
          ptpPriority2: '', //优先级2
          timeSource: '', //时间源
          announceIntv: '', //通知间隔
          syncIntv: '', //同步间隔
          delayIntv: '', //延时间隔
          packageType: '', //报文封装类型
          broadcastType: '', //报文播发类型
          delayMechanism: '', //延时机制
        };
        portParamState[index] = matchedParam;
      });
    },
  );
  const handleOk = () => {
    emits('sure', portParamState.slice(0, portList.value.length));
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
    },
    close() {},
  });
</script>
