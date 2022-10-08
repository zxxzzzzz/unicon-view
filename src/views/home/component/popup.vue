<template>
  <div class="absolute bg-white p-1" :style="positionStyle" v-if="visible">
    <Descriptions bordered :column="1">
      <DescriptionsItem label="名称" v-if="props.name">{{ props.name }}</DescriptionsItem>
      <DescriptionsItem label="ip" v-if="props.ip">{{ props.ip }}</DescriptionsItem>
      <DescriptionsItem label="端口">
        <template v-for="port in props.portList" :key="port">
          <div>{{ port }}</div>
        </template>
      </DescriptionsItem>
    </Descriptions>
  </div>
</template>
<script lang="ts" setup>
  import { Descriptions, DescriptionsItem, Card } from 'ant-design-vue';
  import { computed, watch, withDefaults } from 'vue';
  const props = withDefaults(
    defineProps<{
      position: { x: number; y: number };
      name: string;
      ip: string;
      portList: string[];
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
