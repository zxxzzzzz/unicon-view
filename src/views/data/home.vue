<template>
  <div>
    <div class="flex">
      <div class="flex-1">
        <Card title="1588">
          <T1588Table :selectedPortList="portList" />
        </Card>
      </div>
      <div class="flex-1">
        <Card title="同步">
          <SyncTable :selectedPortList="portList" />
        </Card>
      </div>
    </div>
    <Card title="告警">
      <WarnTable />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import WarnTable from './component/warnTable.vue';
  import T1588Table from './component/1588Table.vue';
  import SyncTable from './component/syncTable.vue';
  import { Card } from 'ant-design-vue';
  import { computed } from 'vue';
  const props = defineProps<{ portList: string }>();
  const portList = computed(() => {
    return JSON.parse(atob(props.portList));
  });
  // console.log(props);
  // defineProps<{  }>();
</script>
