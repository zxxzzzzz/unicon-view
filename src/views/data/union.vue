<template>
  <div>
    <Card title="仿真">
      <InputTable @send="handleSend" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import InputTable from './component/inputTable.vue';
  import { Card } from 'ant-design-vue';
  const props = defineProps<{}>();
  const handleSend = () => {
    window.dispatchEvent(new Event('data'));
  };
</script>
