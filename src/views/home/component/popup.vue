<template>
  <div class="absolute bg-white p-4" :style="positionStyle">
    <Descriptions bordered :column="1">
      <DescriptionsItem>123</DescriptionsItem>
      <DescriptionsItem>123</DescriptionsItem>
      <DescriptionsItem>123</DescriptionsItem>
      <DescriptionsItem>123</DescriptionsItem>
    </Descriptions>
  </div>
</template>
<script lang="ts" setup>
  import { Descriptions, DescriptionsItem, Card } from 'ant-design-vue';
  import { computed, watch, withDefaults } from 'vue';
  const props = withDefaults(defineProps<{ position: { x: number; y: number } }>(), {
    position: () => ({ x: 0, y: 0 }),
  });
  const positionStyle = computed(() => {
    console.log(`top:${props.position.y * 1}px;left:${props.position.x * 1}px`);
    return `top:${props.position.y * 1}px;left:${props.position.x * 1}px`;
  });
</script>
