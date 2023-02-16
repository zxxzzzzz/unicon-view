<template>
  <div class="absolute bg-white p-1" :style="positionStyle" v-if="visible">
    <Descriptions bordered :column="1">
      <DescriptionsItem label="名称" v-if="props.name">{{ props.name }}</DescriptionsItem>
      <DescriptionsItem label="ip" v-if="props.ip">{{ props.ip }}</DescriptionsItem>
      <DescriptionsItem label="端口">
        <div class="h-48 overflow-auto">
          <template v-for="port in props.portList" :key="port">
            <div>{{ port.portName }}</div>
          </template>
        </div>
      </DescriptionsItem>
    </Descriptions>
  </div>
</template>
<script lang="ts" setup>
  import { Descriptions, DescriptionsItem } from 'ant-design-vue';
  import { computed, withDefaults } from 'vue';

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

  const props = withDefaults(
    defineProps<{
      position: { x: number; y: number };
      name: string;
      ip: string;
      portList: Port[];
      visible: boolean;
    }>(),
    {
      position: () => ({ x: 0, y: 0 }),
      name: '',
      ip: '',
      visible: false,
      portList: () => [],
    },
  );
  const positionStyle = computed(() => {
    return `top:${props.position.y * 1}px;left:${props.position.x * 1}px`;
  });
</script>
